/* ==========================================================================
   VishOmics  |  publication record
   Plain JS (not JSON) so the page also works when opened straight off disk
   with file:// , where fetch() would be blocked by CORS.
   To add a paper: copy a block, edit it, done. Nothing else to touch.
   ========================================================================== */
window.PUBLICATIONS = [
  {
    kind: 'article',
    year: 2026,
    title: 'Beyond Platelet Destruction: A Mechanistic Understanding of Dengue Virus Non-Structural Proteins and Gene Regulatory Networks Driving Thrombocytopenia',
    authors: ['Chanda, V.', 'Muralidaran, Y.', 'Mishra, P.'],
    venue: 'Journal of Thrombosis and Thrombolysis, 1–17',
    doi: '10.1007/s11239-026-03365-6',
    url: 'https://doi.org/10.1007/s11239-026-03365-6',
    tags: ['Dengue', 'Transcriptomics', 'Gene regulatory networks', 'Thrombocytopenia']
  },
  {
    kind: 'article',
    year: 2025,
    title: 'Unveiling natural antiviral agents against dengue virus: a hybrid machine learning and molecular dynamics approach',
    authors: ['Chanda, V.', 'Hanumantharayudu, P. T.', 'Keshri, V.', 'Haldar, A.', 'Muralidaran, Y.', 'Mishra, P.'],
    venue: 'Network Modeling Analysis in Health Informatics and Bioinformatics, 14(1), 164',
    doi: '10.1007/s13721-025-00670-7',
    url: 'https://doi.org/10.1007/s13721-025-00670-7',
    tags: ['Machine learning', 'Molecular dynamics', 'Antivirals', 'Phytochemicals']
  },
  {
    kind: 'article',
    year: 2025,
    title: 'Conformational perturbations in serum protein biomarkers specific to hepatic metabolism upon interaction with polystyrene nano-spherules',
    authors: ['Haldar, S.', 'Yhome, N.', 'Chanda, V.', 'Mishra, P.'],
    venue: 'Journal of Molecular Structure, 144549',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S002228602503193X',
    tags: ['Protein conformation', 'Nanoplastics', 'Biophysics']
  },
  {
    kind: 'chapter',
    year: 2025,
    title: 'Impact of microplastics on economic condition in underdeveloped nations',
    authors: ['Haldar, S.', 'Chanda, V.', 'Muralidaran, Y.', 'Mishra, P.'],
    venue: 'In Microplastics (pp. 481–508). Elsevier',
    url: 'https://www.sciencedirect.com/science/article/pii/B9780443298042000214',
    tags: ['Microplastics', 'Environmental health']
  },
  {
    kind: 'chapter',
    year: 2023,
    title: 'Obsessive-Compulsive Disorder: A Perspective Review',
    authors: ['Chanda, V.', 'Rajagopal, S.', 'Muralidaran, Y.'],
    venue: 'Nutrition and Obsessive-Compulsive Disorder, 3–15',
    tags: ['Neurobiology', 'Nutrition', 'Review']
  },
  {
    kind: 'patent',
    year: 2025,
    title: 'Controlling droplet size in gallic acid nano-emulsions via low-energy fabrication techniques',
    authors: ['Mishra, P.', 'Chanda, V.', 'Topinar Hanumantharay, P.', 'REVA University'],
    venue: 'Indian Patent Application No. 202541087201',
    tags: ['Nano-emulsion', 'Formulation', 'Gallic acid']
  },
  {
    kind: 'conference',
    year: 2026,
    award: 'Best Oral Presentation',
    title: 'AI-Driven Discovery of Natural Multi-Target Inhibitors Against Dengue Virus Using Integrated Docking, Molecular Dynamics and Machine Learning Approaches',
    authors: ['Chanda, V.'],
    venue: 'International Conference on Artificial Intelligence in Drug Discovery & Development, SwaLife Biotech, April 2026. Ph.D. Scholar Category',
    tags: ['Multi-target inhibitors', 'Docking', 'AI']
  },
  {
    kind: 'conference',
    year: 2023,
    title: 'Virucidal activity of various bio-active compounds against noxious arboviral diseases',
    authors: ['Chanda, V.'],
    venue: 'Biorujivith 2023, International Conference, Garden City University, Bangalore, March 2023',
    tags: ['Arboviruses', 'Bioactive compounds']
  },
  {
    kind: 'conference',
    year: 2022,
    title: 'Exploring the Antiviral Activity of Bioactive Seaweed Extracts Against the Dengue Virus',
    authors: ['Chanda, V.'],
    venue: '5th REVA Research Conclave, REVA University, Bangalore, December 2022',
    tags: ['Seaweed extracts', 'Antiviral assays']
  }
];
