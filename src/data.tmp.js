const tags = [
  {
    id: 0,
    tag_node_guid: "guid0",
    parent_id: null,
    parent_node_guid: null,
    name: 'service',
    path: "guid0"
  },
  {
    id: 1,
    tag_node_guid: "guid1",
    parent_id: 0,
    parent_node_guid: "guid0",
    name: 'patched_dev',
    path: 'guid0/guid1'
  },
  {
    id: 2,
    tag_node_guid: "guid2",
    parent_id: 1,
    parent_node_guid: "guid1",
    name: 'critical',
    path: 'guid0/guid1/guid2'
  },
  {
    id: 3,
    tag_node_guid: "guid3",
    parent_id: 1,
    parent_node_guid: "guid1",
    name: 'old_firmware',
    path: 'guid0/guid1/guid3'
  },
  {
    id: 4,
    tag_node_guid: "guid4",
    parent_id: 0,
    parent_node_guid: "guid0",
    name: 'new_os | KZKZ',
    path: 'guid0/guid4'
  },
  {
    id: 5,
    tag_node_guid: "guid5",
    parent_id: 0,
    parent_node_guid: "guid0",
    name: 'airport',
    path: 'guid0/guid5'
  },
  {
    id: 6,
    tag_node_guid: "guid6",
    parent_id: 0,
    parent_node_guid: "guid0",
    name: 'online',
    path: 'guid0/guid6'
  },
  {
    id: 7,
    tag_node_guid: "guid7",
    parent_id: 0,
    parent_node_guid: "guid0",
    name: 'new_part',
    path: 'guid0/guid7'
  },
  {
    id: 8,
    tag_node_guid: "guid8",
    parent_id: 4,
    parent_node_guid: "guid4",
    name: 'standard | IBMA RURU',
    path: 'guid0/guid4/guid8'
  },
  {
    id: 9,
    tag_node_guid: "guid9",
    parent_id: 4,
    parent_node_guid: "guid4",
    name: 'updated_devices | CMDR BEBE',
    path: 'guid0/guid4/guid9'
  },
  {
    id: 10,
    tag_node_guid: "guid10",
    parent_id: 5,
    parent_node_guid: "guid5",
    name: 'terminal_a',
    path: 'guid0/guid5/guid10'
  },
  {
    id: 11,
    tag_node_guid: "guid11",
    parent_id: 5,
    parent_node_guid: "guid5",
    name: 'terminal_b',
    path: 'guid0/guid5/guid11'
  },
  {
    id: 12,
    tag_node_guid: "guid12",
    parent_id: 5,
    parent_node_guid: "guid5",
    name: 'terminal',
    path: 'guid0/guid5/guid12'
  },
  {
    id: 13,
    tag_node_guid: "guid13",
    parent_id: 6,
    parent_node_guid: "guid6",
    name: 'last_update_so_far',
    path: 'guid0/guid6/guid13'
  },
  {
    id: 14,
    tag_node_guid: "guid14",
    parent_id: 6,
    parent_node_guid: "guid6",
    name: 'not_working',
    path: 'guid0/guid6/guid14'
  },
  {
    id: 15,
    tag_node_guid: "guid15",
    parent_id: 6,
    parent_node_guid: "guid6",
    name: 'destroyed',
    path: 'guid0/guid6/guid15'
  },
  {
    id: 16,
    tag_node_guid: "guid16",
    parent_id: 7,
    parent_node_guid: "guid7",
    name: 'basic',
    path: 'guid0/guid7/guid16'
  },
  {
    id: 17,
    tag_node_guid: "guid17",
    parent_id: 7,
    parent_node_guid: "guid7",
    name: 'copy',
    path: 'guid0/guid7/guid17'
  },
  {
    id: 18,
    tag_node_guid: "guid18",
    parent_id: 7,
    parent_node_guid: "guid7",
    name: 'custom',
    path: 'guid0/guid7/guid18'
  },
];

const tags1 = [
  {
    id: 0,
    name: 'airport',
    hasChild: true,
  },
  {
    id: 1,
    name: 'basic',
  },
  {
    id: 2,
    name: 'critical',
  },
  {
    id: 3,
    name: 'copy',
  },
  {
    id: 4,
    name: 'custom',
  },
  {
    id: 5,
    name: 'destroyed',
    hasChild: true,
  },
  {
    id: 6,
    name: 'new_part',
  },
  {
    id: 7,
    name: 'not_working',
    hasChild: true,
  },
  {
    id: 8,
    name: 'online',
  },
  {
    id: 9,
    name: 'old_firmware',
  },
  {
    id: 10,
    name: 'service',
  },
  {
    id: 11,
    name: 'terminal',
    hasChild: true,
  }
];

const dataDevice = [
  {
    id: 1,
    model: "Columbo DT",
    Id: 1627282921,
    serialNumber: "MT318318-BR(E)",
    scanningsCount: 12139,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 2,
    model: "Columbo DT",
    Id: 4076282921,
    serialNumber: "MN-156-678",
    scanningsCount: 628,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 3,
    model: "Columbo DT",
    Id: 676282921,
    serialNumber: "RT-759OS",
    scanningsCount: 363,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 4,
    model: "Columbo OEM",
    Id: 5180282921,
    serialNumber: "AJA-156678",
    scanningsCount: 1353,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 5,
    model: "Columbo OEM",
    Id: 6856282921,
    serialNumber: "CR-15678-BR",
    scanningsCount: 2906,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 6,
    model: "Columbo OEM",
    Id: 9030282921,
    serialNumber: "RT156678",
    scanningsCount: 75,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4]
    ],
    popover: false
  },
  {
    id: 7,
    model: "Five-0",
    Id: 4488282921,
    serialNumber: "ZM-156678",
    scanningsCount: 12,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 8,
    model: "Five-0",
    Id: 7920282921,
    serialNumber: "MAS-156678",
    scanningsCount: 13144,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 9,
    model: "Danno",
    Id: 3850282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 1005,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 10,
    model: "Danno",
    Id: 8850282921,
    serialNumber: "AST-1566-7RU",
    scanningsCount: 678,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 11,
    model: "Kojak",
    Id: 2500282921,
    serialNumber: "MT318-BR(E)",
    scanningsCount: 522,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 12,
    model: "Kojak",
    Id: 9940282921,
    serialNumber: "RT-15667RU",
    scanningsCount: 132,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8]
    ],
    popover: false
  },
  {
    id: 13,
    model: "Kojak PL",
    Id: 4760282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 5896,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: false
  },
  {
    id: 14,
    model: "Kojak PL",
    Id: 7130282921,
    serialNumber: "WR-15667RU",
    scanningsCount: 11225,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 15,
    model: "Kojak PL",
    Id: 6350282921,
    serialNumber: "CR-15667RU",
    scanningsCount: 126,
    tags: [tags[2], tags[3]],
    popover: false
  },
  {
    id: 16,
    model: "Sherlock",
    Id: 403022921,
    serialNumber: "KZ-15667RU",
    scanningsCount: 117,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 17,
    model: "Sherlock",
    Id: 7900282921,
    serialNumber: "ALA-15667RU",
    scanningsCount: 4589,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 18,
    model: "Sherlock",
    Id: 2870282921,
    serialNumber: "ZM-15667RU",
    scanningsCount: 2001,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 19,
    model: "Watson Mini",
    Id: 5580282921,
    serialNumber: "RT-15667QQ",
    scanningsCount: 1145,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 20,
    model: "Watson Mini",
    Id: 1520282921,
    serialNumber: "MAS-15667QQ",
    scanningsCount: 6557,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 21,
    model: "Columbo DT",
    Id: 1627282921,
    serialNumber: "MT318318-BR(E)",
    scanningsCount: 12139,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 22,
    model: "Columbo DT",
    Id: 4076282921,
    serialNumber: "MN-156-678",
    scanningsCount: 628,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 23,
    model: "Columbo DT",
    Id: 676282921,
    serialNumber: "RT-759OS",
    scanningsCount: 363,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 24,
    model: "Columbo OEM",
    Id: 5180282921,
    serialNumber: "AJA-156678",
    scanningsCount: 1353,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 25,
    model: "Columbo OEM",
    Id: 6856282921,
    serialNumber: "CR-15678-BR",
    scanningsCount: 2906,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 26,
    model: "Columbo OEM",
    Id: 9030282921,
    serialNumber: "RT156678",
    scanningsCount: 75,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4]
    ],
    popover: false
  },
  {
    id: 27,
    model: "Five-0",
    Id: 4488282921,
    serialNumber: "ZM-156678",
    scanningsCount: 12,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 28,
    model: "Five-0",
    Id: 7920282921,
    serialNumber: "MAS-156678",
    scanningsCount: 13144,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 29,
    model: "Danno",
    Id: 3850282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 1005,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 30,
    model: "Danno",
    Id: 8850282921,
    serialNumber: "AST-1566-7RU",
    scanningsCount: 678,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 31,
    model: "Kojak",
    Id: 2500282921,
    serialNumber: "MT318-BR(E)",
    scanningsCount: 522,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 32,
    model: "Kojak",
    Id: 9940282921,
    serialNumber: "RT-15667RU",
    scanningsCount: 132,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8]
    ],
    popover: false
  },
  {
    id: 33,
    model: "Kojak PL",
    Id: 4760282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 5896,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: false
  },
  {
    id: 34,
    model: "Kojak PL",
    Id: 7130282921,
    serialNumber: "WR-15667RU",
    scanningsCount: 11225,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 35,
    model: "Kojak PL",
    Id: 6350282921,
    serialNumber: "CR-15667RU",
    scanningsCount: 126,
    tags: [tags[2], tags[3]],
    popover: false
  },
  {
    id: 36,
    model: "Sherlock",
    Id: 403022921,
    serialNumber: "KZ-15667RU",
    scanningsCount: 117,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 37,
    model: "Sherlock",
    Id: 7900282921,
    serialNumber: "ALA-15667RU",
    scanningsCount: 4589,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 38,
    model: "Sherlock",
    Id: 2870282921,
    serialNumber: "ZM-15667RU",
    scanningsCount: 2001,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 39,
    model: "Watson Mini",
    Id: 5580282921,
    serialNumber: "RT-15667QQ",
    scanningsCount: 1145,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 40,
    model: "Watson Mini",
    Id: 1520282921,
    serialNumber: "MAS-15667QQ",
    scanningsCount: 6557,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 41,
    model: "Columbo DT",
    Id: 1627282921,
    serialNumber: "MT318318-BR(E)",
    scanningsCount: 12139,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 42,
    model: "Columbo DT",
    Id: 4076282921,
    serialNumber: "MN-156-678",
    scanningsCount: 628,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 43,
    model: "Columbo DT",
    Id: 676282921,
    serialNumber: "RT-759OS",
    scanningsCount: 363,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 44,
    model: "Columbo OEM",
    Id: 5180282921,
    serialNumber: "AJA-156678",
    scanningsCount: 1353,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 45,
    model: "Columbo OEM",
    Id: 6856282921,
    serialNumber: "CR-15678-BR",
    scanningsCount: 2906,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 46,
    model: "Columbo OEM",
    Id: 9030282921,
    serialNumber: "RT156678",
    scanningsCount: 75,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4]
    ],
    popover: false
  },
  {
    id: 47,
    model: "Five-0",
    Id: 4488282921,
    serialNumber: "ZM-156678",
    scanningsCount: 12,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 48,
    model: "Five-0",
    Id: 7920282921,
    serialNumber: "MAS-156678",
    scanningsCount: 13144,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 49,
    model: "Danno",
    Id: 3850282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 1005,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8],
      tags[9]
    ],
    popover: true
  },
  {
    id: 50,
    model: "Danno",
    Id: 8850282921,
    serialNumber: "AST-1566-7RU",
    scanningsCount: 678,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 51,
    model: "Kojak",
    Id: 2500282921,
    serialNumber: "MT318-BR(E)",
    scanningsCount: 522,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 52,
    model: "Kojak",
    Id: 9940282921,
    serialNumber: "RT-15667RU",
    scanningsCount: 132,
    tags: [
      tags[2],
      tags[3],
      tags[1],
      tags[0],
      tags[4],
      tags[8]
    ],
    popover: false
  },
  {
    id: 53,
    model: "Kojak PL",
    Id: 4760282921,
    serialNumber: "PV-15667RU",
    scanningsCount: 5896,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: false
  },
  {
    id: 54,
    model: "Kojak PL",
    Id: 7130282921,
    serialNumber: "WR-15667RU",
    scanningsCount: 11225,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 55,
    model: "Kojak PL",
    Id: 6350282921,
    serialNumber: "CR-15667RU",
    scanningsCount: 126,
    tags: [tags[2], tags[3]],
    popover: false
  },
  {
    id: 56,
    model: "Sherlock",
    Id: 403022921,
    serialNumber: "KZ-15667RU",
    scanningsCount: 117,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 57,
    model: "Sherlock",
    Id: 7900282921,
    serialNumber: "ALA-15667RU",
    scanningsCount: 4589,
    tags: [tags[2], tags[3], tags[1]],
    popover: false
  },
  {
    id: 58,
    model: "Sherlock",
    Id: 2870282921,
    serialNumber: "ZM-15667RU",
    scanningsCount: 2001,
    tags: [tags[2]],
    popover: false
  },
  {
    id: 59,
    model: "Watson Mini",
    Id: 5580282921,
    serialNumber: "RT-15667QQ",
    scanningsCount: 1145,
    tags: [tags[2], tags[3], tags[1], tags[0]],
    popover: true
  },
  {
    id: 60,
    model: "Watson Mini",
    Id: 1520282921,
    serialNumber: "MAS-15667QQ",
    scanningsCount: 6557,
    tags: [tags[2]],
    popover: false
  }
]

const dataAgent = [{
  id: 1,
  model: "Amarant1798",
  Id: 152265664,
  sdk: "B.01.95",
  os: "Harmony",
  connected: "12.07.2021 11:45:56",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 2,
  model: "Ben-TQ",
  Id: 407665664,
  sdk: "A.01.90",
  os: "Tizen",
  connected: "17.08.2021 12:04:17",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 3,
  model: "CMNDT",
  Id: 287765664,
  sdk: "A.01.36",
  os: "myOS",
  connected: "25.08.2021 00:37:04",
  tags: [tags[2]],
  popover: false
},
{
  id: 4,
  model: "DUST-XS",
  Id: 5559865664,
  sdk: "A.01.90",
  os: "Android",
  connected: "14.08.2021 00:37:04",
  tags: [
    tags[2],
    tags[3],
    tags[1],
    tags[8],
    tags[9]
  ],
  popover: true
},
{
  id: 5,
  model: "ERSON-TQ",
  Id: 790699596,
  sdk: "A.01.90",
  os: "miUI",
  connected: "25.06.2021 18:14:45",
  tags: [tags[2]],
  popover: false
},
{
  id: 6,
  model: "GS_Leco",
  Id: 403540585,
  sdk: "A.01.36",
  os: "OneUI",
  connected: "17.07.2019 00:37:04",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 7,
  model: "Hugeon",
  Id: 635565664,
  sdk: "A.05.03",
  os: "Symbian",
  connected: "14.01.2021 02:35:50",
  tags: [tags[2]],
  popover: false
},
{
  id: 8,
  model: "Jux-M19",
  Id: 7131865664,
  sdk: "A.05.03",
  os: "Series40",
  connected: "15.08.2021 09:27:30",
  tags: [
    tags[2],
    tags[3],
    tags[1],
    tags[8],
    tags[9]
  ],
  popover: true
},
{
  id: 9,
  model: "Karma-Z",
  Id: 4765865664,
  sdk: "2.6.153.0",
  os: "Windows",
  connected: "17.09.2021 03:50:17",
  tags: [
    tags[2],
    tags[3],
    tags[1],
    tags[8],
    tags[9]
  ],
  popover: true
},
{
  id: 10,
  model: "LL-Mod",
  Id: 9940865664,
  sdk: "B.03.86",
  os: "Ubuntu",
  connected: "16.05.2021 00:37:04",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 11,
  model: "Next-OE",
  Id: 2507765664,
  sdk: "C.05.85",
  os: "Fedora",
  connected: "03.04.2021 17:16:04",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 12,
  model: "Opus-92",
  Id: 888565664,
  sdk: "C.06.28",
  os: "Android",
  connected: "22.04.2020 11:27:04",
  tags: [
    tags[2],
    tags[3],
    tags[1],
    tags[8]
  ],
  popover: false
},
{
  id: 13,
  model: "Pegion",
  Id: 15529865664,
  sdk: "C.01.24",
  os: "Tizen",
  connected: "12.03.2021 20:27:04",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 14,
  model: "Pigeon10",
  Id: 3854865664,
  sdk: "2.2.2.2",
  os: "ChromeOS",
  connected: "22.01.2021 09:15:41",
  tags: [tags[2]],
  popover: false
},
{
  id: 15,
  model: "Q-Eli",
  Id: 7925865664,
  sdk: "A.01.00",
  os: "Harmony",
  connected: "25.06.2021 22:32:42",
  tags: [tags[2], tags[3]],
  popover: false
},
{
  id: 16,
  model: "Rampage-ST",
  Id: 4488865664,
  sdk: "A.02.24",
  os: "OneUI",
  connected: "03.04.2021 11:27:29",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 17,
  model: "T-REX",
  Id: 9036865664,
  sdk: "5.0.4.0",
  os: "Android",
  connected: "17.09.2021 00:37:04",
  tags: [
    tags[2],
    tags[3],
    tags[1],
    tags[8]
  ],
  popover: false
},
{
  id: 18,
  model: "UV-43HU",
  Id: 6865865664,
  sdk: "A.01.87",
  os: "Android",
  connected: "17.07.2019 05:40:04",
  tags: [tags[2]],
  popover: false
},
{
  id: 19,
  model: "Venom-2",
  Id: 519707075,
  sdk: "B.01.90",
  os: "Free BSD",
  connected: "15.08.2021 08:20:04",
  tags: [tags[2], tags[3], tags[1]],
  popover: false
},
{
  id: 20,
  model: "Zeon-XS",
  Id: 1522865664,
  sdk: "A.01.00",
  os: "Debian",
  connected: "14.08.2021 10:37:04",
  tags: [tags[2]],
  popover: false
}]

const rules = [
  {
    title: 'apple_tech',
    isRunning: false,
    type: '2'
  },
  {
    title: 'aser_models',
    isRunning: true,
    type: '2'
  },
  {
    title: 'basic',
    isRunning: true,
    type: '2'
  },
  {
    title: 'firmware_updated',
    isRunning: false,
    type: '2'
  },
  {
    title: 'for_delete',
    isRunning: false,
    type: '2'
  },
  {
    title: 'high_quality',
    isRunning: false,
    type: '2'
  },
  {
    title: 'locked',
    isRunning: true,
    type: '2'
  },
  {
    title: 'most_scannings',
    isRunning: false,
    type: '2'
  },
  {
    title: 'most_used',
    isRunning: true,
    type: '2'
  },
  {
    title: 'old_f',
    isRunning: true,
    type: '2'
  },
  {
    title: 'terminal_locked',
    isRunning: false,
    type: '2'
  },
  {
    title: 'ups',
    isRunning: false,
    type: '2'
  },
  {
    title: 'airtag',
    isRunning: true,
    type: '1',
  },
  {
    title: 'bad_scenaries',
    isRunning: true,
    type: '1',
  },
  {
    title: 'building',
    isRunning: true,
    type: '1',
  },
  {
    title: 'chip_tags',
    isRunning: true,
    type: '1',
  },
  {
    title: 'for_customization',
    isRunning: true,
    type: '1',
  },
  {
    title: 'huawei_models',
    isRunning: true,
    type: '1',
  },
  {
    title: 'keeper',
    isRunning: true,
    type: '1',
  },
  {
    title: 'last_modification',
    isRunning: true,
    type: '1',
  },
  {
    title: 'most_used',
    isRunning: true,
    type: '1',
  },
  {
    title: 'next_generation',
    isRunning: true,
    type: '1',
  }
];

export {
  tags,
  tags1,
  rules,
  dataDevice,
  dataAgent
}