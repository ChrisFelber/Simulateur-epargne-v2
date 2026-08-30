(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function createSvgElement(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    var keys = Object.keys(attrs || {});
    for (var i = 0; i < keys.length; i += 1) el.setAttribute(keys[i], String(attrs[keys[i]]));
    return el;
  }

  function clearSvg(svg) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }

  function t(key) {
    var fallbacks = {
      yearsAxis: { fr: 'Années', de: 'Jahre', en: 'Years' },
      year: { fr: 'an', de: 'Jahr', en: 'year' },
      years: { fr: 'ans', de: 'Jahre', en: 'years' },
      finalValue: { fr: 'Valeur finale', de: 'Endwert', en: 'Final value' }
    };
    if (window.InvestmentI18n && typeof window.InvestmentI18n.t === 'function') {
      var translated = window.InvestmentI18n.t(key);
      if (translated && translated !== key) return translated;
    }
    var language = document.documentElement.lang || 'fr';
    return fallbacks[key] && fallbacks[key][language] ? fallbacks[key][language] : key;
  }

  function formatCompactCurrency(value) {
    var absolute = Math.abs(value);
    if (absolute >= 1000000) return Math.round(value / 1000000) + 'M';
    if (absolute >= 1000) return Math.round(value / 1000) + 'k';
    return String(Math.round(value));
  }

  function formatFullCurrency(value) {
    var language = document.documentElement.lang || 'fr';
    var locale = language === 'de' ? 'de-CH' : (language === 'en' ? 'en-CH' : 'fr-CH');
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CHF',
      maximumFractionDigits: 0
    }).format(value);
  }

  function getNiceStep(value) {
    if (value <= 0) return 1;
    var exponent = Math.floor(Math.log(value) / Math.LN10);
    var fraction = value / Math.pow(10, exponent);
    var niceFraction;
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 2.5) niceFraction = 2.5;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
    return niceFraction * Math.pow(10, exponent);
  }

  function renderChart(svg, simulation) {
    if (!svg || !simulation || !simulation.series || simulation.series.length < 2) return;

    var renderedWidth = svg.clientWidth || (svg.parentElement && svg.parentElement.clientWidth) || window.innerWidth || 800;
    var isMobile = renderedWidth <= 640;
    var isCompactDesktop = renderedWidth > 640 && renderedWidth < 900;
    var width = 800;
    var height = isMobile ? 400 : 340;
    var padding;

    if (isMobile) padding = { top: 38, right: 24, bottom: 118, left: 78 };
    else if (isCompactDesktop) padding = { top: 28, right: 24, bottom: 48, left: 78 };
    else padding = { top: 24, right: 24, bottom: 44, left: 88 };

    var innerWidth = width - padding.left - padding.right;
    var innerHeight = height - padding.top - padding.bottom;
    var series = simulation.series;
    var maxValue = 1;
    var i;

    for (i = 0; i < series.length; i += 1) maxValue = Math.max(maxValue, series[i].portfolioValue, series[i].investedCapital);

    var targetTicks = isMobile ? 4 : 5;
    var yStep = getNiceStep(maxValue / targetTicks);
    var niceMax = Math.ceil(maxValue / yStep) * yStep;
    var yTicks = Math.max(1, Math.round(niceMax / yStep));

    var maxYears = Math.max(Number(simulation.params.durationYears) || 1, 1);
    function x(years) { return padding.left + (years / maxYears) * innerWidth; }
    function y(value) { return padding.top + innerHeight - (value / niceMax) * innerHeight; }

    clearSvg(svg);
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    var defs = createSvgElement('defs');
    var gradient = createSvgElement('linearGradient', { id: 'portfolio-fill', x1: '0', y1: '0', x2: '0', y2: '1' });
    gradient.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#32cd32', 'stop-opacity': '0.22' }));
    gradient.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#84e184', 'stop-opacity': '0.03' }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    var gridGroup = createSvgElement('g', { class: 'chart-grid' });

    var unitFontSize = isMobile ? 15 : (isCompactDesktop ? 16 : 18);
    var unitLabelY = isMobile ? 18 : Math.max(9, padding.top - 16);
    var unitLabel = createSvgElement('text', {
      x: padding.left - 10,
      y: unitLabelY,
      'text-anchor': 'end',
      class: 'chart-unit-label'
    });
    unitLabel.textContent = 'CHF';
    unitLabel.style.fontSize = unitFontSize + 'px';
    gridGroup.appendChild(unitLabel);

    for (i = 0; i <= yTicks; i += 1) {
      var value = yStep * i;
      var py = y(value);
      gridGroup.appendChild(createSvgElement('line', { x1: padding.left, x2: width - padding.right, y1: py, y2: py, class: 'chart-grid-line' }));
      var yLabel = createSvgElement('text', { x: padding.left - 10, y: py + 6, 'text-anchor': 'end', class: 'chart-axis-label chart-axis-label-y' });
      yLabel.textContent = formatCompactCurrency(value);
      gridGroup.appendChild(yLabel);
    }

    var xAxisY = y(0);

    if (isMobile) {
      var mobileYears = [0, maxYears / 2, maxYears];
      var xLabelY = xAxisY + 34;
      for (i = 0; i < mobileYears.length; i += 1) {
        var mobileYear = mobileYears[i];
        var mobileTickX = x(mobileYear);
        gridGroup.appendChild(createSvgElement('line', {
          x1: mobileTickX,
          x2: mobileTickX,
          y1: xAxisY,
          y2: xAxisY + 8,
          class: 'chart-x-tick'
        }));
        var mobileXLabel = createSvgElement('text', {
          x: mobileTickX,
          y: xLabelY,
          'text-anchor': i === 0 ? 'start' : (i === mobileYears.length - 1 ? 'end' : 'middle'),
          class: 'chart-axis-label chart-axis-label-x'
        });
        mobileXLabel.textContent = String(Math.round(mobileYear));
        gridGroup.appendChild(mobileXLabel);
      }

      var yearsLabel = createSvgElement('text', {
        x: width - padding.right,
        y: xAxisY + 60,
        'text-anchor': 'end',
        class: 'chart-unit-label chart-axis-unit-x'
      });
      yearsLabel.textContent = t('yearsAxis');
      gridGroup.appendChild(yearsLabel);
    } else {
      var xTicks = Math.min(5, Math.max(1, Math.round(maxYears)));
      for (i = 0; i <= xTicks; i += 1) {
        var years = (maxYears / xTicks) * i;
        var roundedYears = Math.round(years);
        var tickX = x(years);
        gridGroup.appendChild(createSvgElement('line', {
          x1: tickX,
          x2: tickX,
          y1: xAxisY,
          y2: xAxisY + 8,
          class: 'chart-x-tick'
        }));
        var xLabel = createSvgElement('text', { x: tickX, y: height - 12, 'text-anchor': i === 0 ? 'start' : (i === xTicks ? 'end' : 'middle'), class: 'chart-axis-label chart-axis-label-x' });
        xLabel.textContent = roundedYears + ' ' + t(roundedYears === 1 ? 'year' : 'years');
        gridGroup.appendChild(xLabel);
      }
    }
    svg.appendChild(gridGroup);

    function buildPath(key) {
      var parts = [];
      for (var j = 0; j < series.length; j += 1) parts.push((j === 0 ? 'M ' : 'L ') + x(series[j].elapsedYears).toFixed(2) + ' ' + y(series[j][key]).toFixed(2));
      return parts.join(' ');
    }

    var portfolioPath = buildPath('portfolioValue');
    var investedPath = buildPath('investedCapital');
    var last = series[series.length - 1];
    var areaPath = portfolioPath + ' L ' + x(last.elapsedYears).toFixed(2) + ' ' + y(0).toFixed(2) + ' L ' + x(0).toFixed(2) + ' ' + y(0).toFixed(2) + ' Z';

    svg.appendChild(createSvgElement('path', { d: areaPath, class: 'chart-area' }));
    svg.appendChild(createSvgElement('path', { d: investedPath, class: 'chart-line chart-line-invested' }));
    svg.appendChild(createSvgElement('path', { d: portfolioPath, class: 'chart-line chart-line-portfolio' }));
    svg.appendChild(createSvgElement('circle', { cx: x(last.elapsedYears), cy: y(last.portfolioValue), r: isMobile ? 6 : 5, class: 'chart-endpoint portfolio-endpoint' }));
    svg.appendChild(createSvgElement('circle', { cx: x(last.elapsedYears), cy: y(last.investedCapital), r: isMobile ? 3.5 : 4, class: 'chart-endpoint invested-endpoint' }));

    if (isMobile) {
      var summaryY = height - 20;
      var summaryLabel = createSvgElement('text', {
        x: padding.left,
        y: summaryY,
        'text-anchor': 'start',
        class: 'chart-mobile-summary-label'
      });
      summaryLabel.textContent = t('finalValue');
      svg.appendChild(summaryLabel);

      var summaryValue = createSvgElement('text', {
        x: width - padding.right,
        y: summaryY,
        'text-anchor': 'end',
        class: 'chart-mobile-summary-value'
      });
      summaryValue.textContent = formatFullCurrency(last.portfolioValue);
      svg.appendChild(summaryValue);
    }
  }

  window.InvestmentChart = Object.freeze({ renderChart: renderChart });
}());