(function () {
  'use strict';

  var languages = ['fr', 'de', 'en'];
  var locales = { fr: 'fr-CH', de: 'de-CH', en: 'en-CH' };
  var translations = {
    fr: {
      documentTitle: 'Bloom',
      eyebrow: 'Projection d’investissement',
      title: 'Bloom',
      intro: 'Découvre comment le temps, tes versements et le rendement peuvent faire évoluer ton épargne.',
      preferencesAria: 'Préférences de l’application',
      languageAria: 'Changer de langue',
      themeAria: 'Changer de thème',
      resultsAria: 'Résultats de ta simulation',
      estimatedValue: 'Valeur estimée de ton épargne',
      investedCapital: 'Capital investi',
      gains: 'Gains générés',
      performance: 'Performance',
      evolution: 'Évolution',
      chartTitle: 'Évolution de ton épargne',
      chartLegendAria: 'Légende du graphique',
      portfolio: 'Épargne',
      chartInvested: 'Capital investi',
      chartAria: 'Graphique de l’évolution de ton épargne',
      controlsAria: 'Paramètres de ta simulation',
      parameters: 'Paramètres',
      adjustProjection: 'Ajuste ta projection',
      initialCapital: 'Capital initial',
      recurringContribution: 'Versement régulier',
      frequencyAria: 'Fréquence de tes versements',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      annualReturn: 'Rendement annuel moyen',
      duration: 'Durée d’investissement',
      strategies: 'Stratégies',
      chooseHypothesis: 'Choisis ta stratégie',
      strategyAria: 'Stratégies de rendement',
      income: 'Revenu',
      incomeDesc: 'Tu privilégies la stabilité',
      balanced: 'Équilibré',
      balancedDesc: 'Un équilibre entre rendement et risque',
      growth: 'Croissance',
      growthDesc: 'Plus de potentiel de croissance',
      equities: 'Actions',
      equitiesDesc: 'La stratégie la plus dynamique',
      strategyNote: 'Ces rendements servent uniquement à simuler différents scénarios. Ils ne garantissent aucun résultat.',
      disclaimer: 'Les performances passées ne préjugent pas des performances futures.',
      perMonth: '/mois',
      perWeek: '/semaine',
      year: 'an',
      years: 'ans',
      yearsAxis: 'Années'
    },
    de: {
      documentTitle: 'Bloom',
      eyebrow: 'Anlageprojektion',
      title: 'Bloom',
      intro: 'Entdecke, wie Zeit, deine Einzahlungen und die Rendite deine Ersparnisse verändern können.',
      preferencesAria: 'App-Einstellungen',
      languageAria: 'Sprache wechseln',
      themeAria: 'Design wechseln',
      resultsAria: 'Ergebnisse deiner Simulation',
      estimatedValue: 'Geschätzter Wert deiner Ersparnisse',
      investedCapital: 'Investiertes Kapital',
      gains: 'Erzielter Gewinn',
      performance: 'Performance',
      evolution: 'Entwicklung',
      chartTitle: 'Entwicklung deiner Ersparnisse',
      chartLegendAria: 'Diagrammlegende',
      portfolio: 'Ersparnisse',
      chartInvested: 'Investiertes Kapital',
      chartAria: 'Diagramm zur Entwicklung deiner Ersparnisse',
      controlsAria: 'Parameter deiner Simulation',
      parameters: 'Parameter',
      adjustProjection: 'Passe deine Projektion an',
      initialCapital: 'Startkapital',
      recurringContribution: 'Regelmässige Einzahlung',
      frequencyAria: 'Rhythmus deiner Einzahlungen',
      monthly: 'Monatlich',
      weekly: 'Wöchentlich',
      annualReturn: 'Durchschnittliche Jahresrendite',
      duration: 'Anlagedauer',
      strategies: 'Strategien',
      chooseHypothesis: 'Wähle deine Strategie',
      strategyAria: 'Renditestrategien',
      income: 'Ertrag',
      incomeDesc: 'Du setzt auf Stabilität',
      balanced: 'Ausgewogen',
      balancedDesc: 'Ein Mix aus Rendite und Risiko',
      growth: 'Wachstum',
      growthDesc: 'Mehr Wachstumspotenzial',
      equities: 'Aktien',
      equitiesDesc: 'Die dynamischste Strategie',
      strategyNote: 'Diese Renditen dienen nur zur Simulation verschiedener Szenarien. Sie garantieren kein Ergebnis.',
      disclaimer: 'Vergangene Wertentwicklungen sind kein verlässlicher Hinweis auf zukünftige Ergebnisse.',
      perMonth: '/Monat',
      perWeek: '/Woche',
      year: 'Jahr',
      years: 'Jahre',
      yearsAxis: 'Jahre'
    },
    en: {
      documentTitle: 'Bloom',
      eyebrow: 'Investment projection',
      title: 'Bloom',
      intro: 'See how time, your contributions and returns could grow your savings.',
      preferencesAria: 'Application preferences',
      languageAria: 'Change language',
      themeAria: 'Change theme',
      resultsAria: 'Your simulation results',
      estimatedValue: 'Estimated value of your savings',
      investedCapital: 'Invested capital',
      gains: 'Generated gains',
      performance: 'Performance',
      evolution: 'Growth',
      chartTitle: 'How your savings could grow',
      chartLegendAria: 'Chart legend',
      portfolio: 'Savings',
      chartInvested: 'Invested capital',
      chartAria: 'Chart showing how your savings could grow',
      controlsAria: 'Your simulation settings',
      parameters: 'Settings',
      adjustProjection: 'Adjust your projection',
      initialCapital: 'Initial capital',
      recurringContribution: 'Recurring contribution',
      frequencyAria: 'Your contribution frequency',
      monthly: 'Monthly',
      weekly: 'Weekly',
      annualReturn: 'Average annual return',
      duration: 'Investment duration',
      strategies: 'Strategies',
      chooseHypothesis: 'Choose your strategy',
      strategyAria: 'Return strategies',
      income: 'Income',
      incomeDesc: 'You’re prioritising stability',
      balanced: 'Balanced',
      balancedDesc: 'A balance of return and risk',
      growth: 'Growth',
      growthDesc: 'More growth potential',
      equities: 'Equities',
      equitiesDesc: 'The most dynamic strategy',
      strategyNote: 'These returns are only used to simulate different scenarios. They do not guarantee any result.',
      disclaimer: 'Past performance is not a reliable indicator of future results.',
      perMonth: '/month',
      perWeek: '/week',
      year: 'year',
      years: 'years',
      yearsAxis: 'Years'
    }
  };

  function loadLanguage() {
    try {
      var saved = sessionStorage.getItem('investment-language');
      if (languages.indexOf(saved) !== -1) return saved;
    } catch (error) {}
    return 'fr';
  }

  var currentLanguage = loadLanguage();

  function t(key) {
    return translations[currentLanguage][key] || translations.fr[key] || key;
  }

  function apply(root) {
    var scope = root || document;
    var textNodes = scope.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i += 1) {
      textNodes[i].textContent = t(textNodes[i].getAttribute('data-i18n'));
    }

    var ariaNodes = scope.querySelectorAll('[data-i18n-aria-label]');
    for (var j = 0; j < ariaNodes.length; j += 1) {
      ariaNodes[j].setAttribute('aria-label', t(ariaNodes[j].getAttribute('data-i18n-aria-label')));
    }

    document.documentElement.lang = currentLanguage;
    document.title = t('documentTitle');
  }

  function setLanguage(language) {
    if (languages.indexOf(language) === -1) return currentLanguage;
    currentLanguage = language;
    try { sessionStorage.setItem('investment-language', currentLanguage); } catch (error) {}
    apply(document);
    return currentLanguage;
  }

  function nextLanguage() {
    var index = languages.indexOf(currentLanguage);
    return setLanguage(languages[(index + 1) % languages.length]);
  }

  window.InvestmentI18n = Object.freeze({
    t: t,
    apply: apply,
    setLanguage: setLanguage,
    nextLanguage: nextLanguage,
    getLanguage: function () { return currentLanguage; },
    getLocale: function () { return locales[currentLanguage]; }
  });
}());