const SECTION_PAGES = {
  // Define which page numbers (fileNum) act as full‑width interior‑scene sections per catalog
  "malacca_n": [2, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61],
  "rimal_emaar_n": [4, 8, 14, 17, 19, 21, 24, 25, 27, 31, 35, 37, 38, 40, 42, 43, 49, 52, 53, 57],
  "rimal_wallcovering_n": [4, 5, 8, 11, 16, 19, 25, 29]
};

const CUSTOM_PAGE_ORDER = {
  // Custom display sequence of page file numbers (fileNum) for catalogs
  "rimal_emaar_n": [
    4, 2, 6,                            // Group 1: Geometric (EMR-04 room scene, then EMR-01, EMR-09 products)
    49, 5, 3, 7, 44, 45, 46, 47, 48,    // Group 15: Marble with Branch Outline (EMR-48 room scene, EMR-04/02/10 and EMR-47/48/52/53/54 products)
    8, 10, 9,                           // Group 3: Floral (EMR-14 room scene, then EMR-14, EMR-11 products)
    14, 12, 11, 13,                     // Group 4: Chevron-like (EMR-16 room scene, then EMR-16, EMR-15, EMR-17 products)
    17, 16, 15,                         // Group 5: Leaf (EMR-19 room scene, then EMR-19, EMR-18 products)
    19, 18,                             // Group 6: 3D Cubes (EMR-20 room scene, then EMR-20 product)
    21, 20,                             // Group 7: Classic Damask (EMR-21 room scene, then EMR-21 product)
    24, 23, 22,                         // Group 8: Concentric Arcs (EMR-24 room scene, then EMR-24, EMR-22 products)
    27, 26,                             // Group 9: Wavy Lines (EMR-28 wavy lines room scene, EMR-28 product)
    31, 30, 28, 29,                     // Group 10: Overlapping Circles (EMR-34 room scene, then EMR-34, EMR-31, EMR-32 products)
    38, 35, 32, 33, 34, 40, 39,             // Group 11: Damask/Lattice (EMR-35 yellow scene, EMR-37 blue scene 35, EMR-35 product, EMR-36 green product, EMR-37 product, EMR-37 blue scene 40, VL-7076)
    37, 36,                             // Group 12: Liquid Marble (EMR-39 room scene, EMR-39 product)
    43, 25,                             // Group 13: Textured (EMR-43 checkered room scene, coordinate room scene)
    42, 41,                             // Group 14: Gold Damask (EMR-44 room scene, EMR-44 product)
    52, 51, 50,                         // Group 16: 3D Lines (EMR-57 room scene, EMR-57, EMR-55 products)
    57, 54, 55, 56, 53                  // Group 17: Liquid Marble/Veins (EMR-61 blue scene, EMR-61 blue product, EMR-62/63 products, EMR-61 light coordinate scene)
  ],
  "rimal_wallcovering_n": [
    2, 3,                               // Group 1: JM212206, JM210106
    4, 5,                               // Room scenes
    6,                                  // HL-8003
    8, 7, 9, 10,                        // Group 2: YS-9742xx series (Room scene 8, YS-974210, YS-974212, YS-974213)
    11, 12, 13, 14, 15,                 // Group 3: 10607, JM211206, AG90076, 10402 (with room scene 11)
    16, 17, 18,                         // Group 4: JM210306, JM210506 (with room scene 16)
    19, 20, 21, 22, 23, 24,             // Group 5: JM210305, A220204, 1005-6, JM210408, ME 20098 (with room scene 19)
    25, 26, 27, 28,                     // Group 6: 1101-3, JM210907, W5-039 (with room scene 25)
    29, 30, 31, 32, 33                  // Group 7: 52153, W5-043, F9125, 83004 (with room scene 29)
  ]
};
