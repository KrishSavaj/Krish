

// Parametric 2D equations
// Format: { label: 'EdgeX', equation: 'x = ..., y = ..., t = ...' }
var shapes = [
  { label: 'Edge1', equation: 'x = 0 + 25 * cos(t), y = 0 + 25 * sin(t), t = 0 to 6.28319' },
 ];
 
const shapes = [
  {
    label: "Line1",
    equation: "G01D02"
  },
  {
    label: "Line2",
    equation: "X74250000Y-151250000D02"
  },
  {
    label: "LineDraw3",
    equation: "X50250000Y-151250000D01"
  },
  {
    label: "Line4",
    equation: "X47250000Y-148250000D02"
  },
  {
    label: "LineDraw5",
    equation: "X50250000Y-151250000I3000000J0D01"
  },
  {
    label: "LineDraw6",
    equation: "G01D01"
  },
  {
    label: "Flash1",
    equation: "X52175000Y-142950000D03"
  },
  {
    label: "Flash2",
    equation: "X49635000Y-142950000D03"
  },
  {
    label: "Flash3",
    equation: "X52175000Y-140410000D03"
  },
  {
    label: "Flash4",
    equation: "X49635000Y-140410000D03"
  },
  {
    label: "Flash5",
    equation: "X52175000Y-137870000D03"
  },
  {
    label: "Flash6",
    equation: "X49635000Y-137870000D03"
  },
  {
    label: "Flash7",
    equation: "X52175000Y-135330000D03"
  },
  {
    label: "Flash8",
    equation: "X49635000Y-135330000D03"
  },
  {
    label: "Flash9",
    equation: "X52175000Y-132790000D03"
  },
  {
    label: "Flash10",
    equation: "X49635000Y-132790000D03"
  },
  {
    label: "Flash11",
    equation: "X52175000Y-130250000D03"
  },
  {
    label: "Flash12",
    equation: "X49635000Y-130250000D03"
  },
  {
    label: "Flash13",
    equation: "X52175000Y-127710000D03"
  },
  {
    label: "Flash14",
    equation: "X49635000Y-127710000D03"
  },
  {
    label: "Flash15",
    equation: "X52175000Y-125170000D03"
  },
  {
    label: "Flash16",
    equation: "X49635000Y-125170000D03"
  },
  {
    label: "Flash17",
    equation: "X52175000Y-122630000D03"
  },
  {
    label: "Flash18",
    equation: "X49635000Y-122630000D03"
  },
  {
    label: "Flash19",
    equation: "X52175000Y-120090000D03"
  },
  {
    label: "Flash20",
    equation: "X49635000Y-120090000D03"
  },
  {
    label: "Flash21",
    equation: "X52175000Y-117550000D03"
  },
  {
    label: "Flash22",
    equation: "X49635000Y-117550000D03"
  },
  {
    label: "Flash23",
    equation: "X52175000Y-115010000D03"
  },
  {
    label: "Flash24",
    equation: "X49635000Y-115010000D03"
  },
  {
    label: "Flash25",
    equation: "X52175000Y-112470000D03"
  },
  {
    label: "Flash26",
    equation: "X49635000Y-112470000D03"
  },
  {
    label: "Flash27",
    equation: "X52175000Y-109930000D03"
  },
  {
    label: "Flash28",
    equation: "X49635000Y-109930000D03"
  },
  {
    label: "Flash29",
    equation: "X52175000Y-107390000D03"
  },
  {
    label: "Flash30",
    equation: "X49635000Y-107390000D03"
  },
  {
    label: "Flash31",
    equation: "X52175000Y-104850000D03"
  },
  {
    label: "Flash32",
    equation: "X49635000Y-104850000D03"
  },
  {
    label: "Flash33",
    equation: "X52175000Y-102310000D03"
  },
  {
    label: "Flash34",
    equation: "X49635000Y-102310000D03"
  },
  {
    label: "Flash35",
    equation: "X52175000Y-99770000D03"
  },
  {
    label: "Flash36",
    equation: "X49635000Y-99770000D03"
  },
  {
    label: "Flash37",
    equation: "X52175000Y-97230000D03"
  },
  {
    label: "Flash38",
    equation: "X49635000Y-97230000D03"
  },
  {
    label: "Flash39",
    equation: "X52175000Y-94690000D03"
  },
  {
    label: "Flash40",
    equation: "X49635000Y-94690000D03"
  },
  {
    label: "Flash41",
    equation: "X106000000Y-156750000D03"
  },
  {
    label: "Flash42",
    equation: "X103460000Y-156750000D03"
  },
  {
    label: "Flash43",
    equation: "X67500000Y-154000000D03"
  },
  {
    label: "Flash44",
    equation: "X67500000Y-156540000D03"
  },
  {
    label: "Flash45",
    equation: "X70040000Y-154000000D03"
  },
  {
    label: "Flash46",
    equation: "X70040000Y-156540000D03"
  },
  {
    label: "Flash47",
    equation: "X72580000Y-154000000D03"
  },
  {
    label: "Flash48",
    equation: "X72580000Y-156540000D03"
  },
  {
    label: "Flash49",
    equation: "X75120000Y-154000000D03"
  },
  {
    label: "Flash50",
    equation: "X75120000Y-156540000D03"
  },
  {
    label: "Flash51",
    equation: "X77660000Y-154000000D03"
  },
  {
    label: "Flash52",
    equation: "X77660000Y-156540000D03"
  },
  {
    label: "Flash53",
    equation: "X80200000Y-154000000D03"
  },
  {
    label: "Flash54",
    equation: "X80200000Y-156540000D03"
  },
  {
    label: "Flash55",
    equation: "X82740000Y-154000000D03"
  },
  {
    label: "Flash56",
    equation: "X82740000Y-156540000D03"
  },
  {
    label: "Flash57",
    equation: "X85280000Y-154000000D03"
  },
  {
    label: "Flash58",
    equation: "X85280000Y-156540000D03"
  },
  {
    label: "Flash59",
    equation: "X87820000Y-154000000D03"
  },
  {
    label: "Flash60",
    equation: "X87820000Y-156540000D03"
  },
  {
    label: "Flash61",
    equation: "X90360000Y-154000000D03"
  },
  {
    label: "Flash62",
    equation: "X90360000Y-156540000D03"
  },
  {
    label: "Flash63",
    equation: "X45004000Y-127037000D03"
  },
  {
    label: "Flash64",
    equation: "X46401000Y-140245000D03"
  },
  {
    label: "Flash65",
    equation: "X102027000Y-94906000D03"
  },
  {
    label: "Flash66",
    equation: "X68372000Y-126656000D03"
  },
  {
    label: "Flash67",
    equation: "X66213000Y-135165000D03"
  },
  {
    label: "Flash68",
    equation: "X66213000Y-128688000D03"
  },
  {
    label: "Flash69",
    equation: "X99614000Y-107733000D03"
  },
  {
    label: "Flash70",
    equation: "X100249000Y-106336000D03"
  },
  {
    label: "Flash71",
    equation: "X58339000Y-148246000D03"
  },
  {
    label: "Flash72",
    equation: "X108885000Y-132371000D03"
  },
  {
    label: "Flash73",
    equation: "X92500000Y-147000000D03"
  },
  {
    label: "Flash74",
    equation: "X58750000Y-158500000D03"
  },
  {
    label: "Flash75",
    equation: "X71250000Y-133000000D03"
  },
  {
    label: "Flash76",
    equation: "X114250000Y-144500000D03"
  },
  {
    label: "Flash77",
    equation: "X90250000Y-127750000D03"
  },
  {
    label: "Flash78",
    equation: "X74750000Y-133500000D03"
  },
  {
    label: "Flash79",
    equation: "X100500000Y-136250000D03"
  },
  {
    label: "Flash80",
    equation: "X70500000Y-93500000D03"
  },
  {
    label: "Flash81",
    equation: "X77000000Y-135250000D03"
  },
  {
    label: "Flash82",
    equation: "X114500000Y-158500000D03"
  },
  {
    label: "Flash83",
    equation: "X63000000Y-96500000D03"
  },
  {
    label: "Flash84",
    equation: "X114000000Y-142000000D03"
  },
  {
    label: "Flash85",
    equation: "X94407000Y-94652000D03"
  },
  {
    label: "Flash86",
    equation: "X73250000Y-96750000D03"
  },
  {
    label: "Flash87",
    equation: "X115870000Y-118020000D03"
  },
  {
    label: "Flash88",
    equation: "X73500000Y-124500000D03"
  },
  {
    label: "Flash89",
    equation: "X114250000Y-147000000D03"
  },
  {
    label: "Flash90",
    equation: "X67610000Y-110400000D03"
  },
  {
    label: "Flash91",
    equation: "X47500000Y-159000000D03"
  },
  {
    label: "Flash92",
    equation: "X87500000Y-132500000D03"
  },
  {
    label: "Flash93",
    equation: "X67000000Y-100000000D03"
  },
  {
    label: "Flash94",
    equation: "X83250000Y-130000000D03"
  },
  {
    label: "Flash95",
    equation: "X102000000Y-117000000D03"
  },
  {
    label: "Flash96",
    equation: "X44500000Y-121750000D03"
  },
  {
    label: "Flash97",
    equation: "X77770000Y-143420000D03"
  },
  {
    label: "Flash98",
    equation: "X113500000Y-100000000D03"
  },
  {
    label: "Flash99",
    equation: "X63000000Y-152750000D03"
  },
  {
    label: "Flash100",
    equation: "X98750000Y-131750000D03"
  },
  {
    label: "Flash101",
    equation: "X113330000Y-90080000D03"
  },
  {
    label: "Flash102",
    equation: "X55250000Y-150250000D03"
  },
  {
    label: "Flash103",
    equation: "X42000000Y-101500000D03"
  },
  {
    label: "Flash104",
    equation: "X58500000Y-124500000D03"
  },
  {
    label: "Flash105",
    equation: "X65000000Y-158500000D03"
  },
  {
    label: "Flash106",
    equation: "X93500000Y-101500000D03"
  },
  {
    label: "Flash107",
    equation: "X105710000Y-123100000D03"
  },
  {
    label: "Flash108",
    equation: "X91250000Y-133750000D03"
  },
  {
    label: "Flash109",
    equation: "X94407000Y-91858000D03"
  },
  {
    label: "Flash110",
    equation: "X54750000Y-108500000D03"
  },
  {
    label: "Flash111",
    equation: "X111750000Y-155750000D03"
  },
  {
    label: "Flash112",
    equation: "X117000000Y-145000000D03"
  },
  {
    label: "Flash113",
    equation: "X71500000Y-127250000D03"
  },
  {
    label: "Flash114",
    equation: "X84250000Y-137500000D03"
  },
  {
    label: "Flash115",
    equation: "X110500000Y-113750000D03"
  },
  {
    label: "Flash116",
    equation: "X53750000Y-154750000D03"
  },
  {
    label: "Flash117",
    equation: "X103678000Y-94525000D03"
  },
  {
    label: "Flash118",
    equation: "X66000000Y-103500000D03"
  },
  {
    label: "Flash119",
    equation: "X114500000Y-150000000D03"
  },
  {
    label: "Flash120",
    equation: "X42500000Y-99500000D03"
  },
  {
    label: "Flash121",
    equation: "X86000000Y-130250000D03"
  },
  {
    label: "Flash122",
    equation: "X83604122Y-106595878D03"
  },
  {
    label: "Flash123",
    equation: "X55000000Y-91250000D03"
  },
  {
    label: "Flash124",
    equation: "X95000000Y-154000000D03"
  },
  {
    label: "Flash125",
    equation: "X117000000Y-155750000D03"
  },
  {
    label: "Flash126",
    equation: "X98500000Y-145000000D03"
  },
  {
    label: "Flash127",
    equation: "X96500000Y-131500000D03"
  },
  {
    label: "Flash128",
    equation: "X117000000Y-147500000D03"
  },
  {
    label: "Flash129",
    equation: "X69500000Y-101500000D03"
  },
  {
    label: "Flash130",
    equation: "X86750000Y-127750000D03"
  },
  {
    label: "Flash131",
    equation: "X99500000Y-125750000D03"
  },
  {
    label: "Flash132",
    equation: "X87750000Y-96250000D03"
  },
  {
    label: "Flash133",
    equation: "X62750000Y-150500000D03"
  },
  {
    label: "Flash134",
    equation: "X43500000Y-117750000D03"
  },
  {
    label: "Flash135",
    equation: "X42500000Y-97000000D03"
  },
  {
    label: "Flash136",
    equation: "X72690000Y-140880000D03"
  },
  {
    label: "Flash137",
    equation: "X96000000Y-147000000D03"
  },
  {
    label: "Flash138",
    equation: "X108750000Y-147000000D03"
  },
  {
    label: "Flash139",
    equation: "X80500000Y-100000000D03"
  },
  {
    label: "Flash140",
    equation: "X44750000Y-88250000D03"
  },
  {
    label: "Flash141",
    equation: "X45000000Y-105500000D03"
  },
  {
    label: "Flash142",
    equation: "X89750000Y-100250000D03"
  },
  {
    label: "Flash143",
    equation: "X85390000Y-90080000D03"
  },
  {
    label: "Flash144",
    equation: "X60750000Y-119000000D03"
  },
  {
    label: "Flash145",
    equation: "X84250000Y-96500000D03"
  },
  {
    label: "Flash146",
    equation: "X113330000Y-120560000D03"
  },
  {
    label: "Flash147",
    equation: "X108250000Y-120560000D03"
  },
  {
    label: "Flash148",
    equation: "X76250000Y-103500000D03"
  },
  {
    label: "Flash149",
    equation: "X112750000Y-106500000D03"
  },
  {
    label: "Flash150",
    equation: "X74000000Y-127250000D03"
  },
  {
    label: "Flash151",
    equation: "X111750000Y-147000000D03"
  },
  {
    label: "Flash152",
    equation: "X80310000Y-92620000D03"
  },
  {
    label: "Flash153",
    equation: "X107750000Y-95750000D03"
  },
  {
    label: "Flash154",
    equation: "X108885000Y-111543000D03"
  },
  {
    label: "Flash155",
    equation: "X117750000Y-95750000D03"
  },
  {
    label: "Flash156",
    equation: "X63800000Y-119417000D03"
  },
  {
    label: "Flash157",
    equation: "X113750000Y-97250000D03"
  },
  {
    label: "Flash158",
    equation: "X105710000Y-128180000D03"
  },
  {
    label: "Flash159",
    equation: "X115500000Y-104500000D03"
  },
  {
    label: "Flash160",
    equation: "X115870000Y-130720000D03"
  },
  {
    label: "Flash161",
    equation: "X108750000Y-155750000D03"
  },
  {
    label: "Flash162",
    equation: "X111000000Y-95250000D03"
  },
  {
    label: "Flash163",
    equation: "X77250000Y-133250000D03"
  },
  {
    label: "Flash164",
    equation: "X65000000Y-93750000D03"
  },
  {
    label: "Flash165",
    equation: "X93750000Y-133750000D03"
  },
  {
    label: "Flash166",
    equation: "X92000000Y-96000000D03"
  },
  {
    label: "Flash167",
    equation: "X93000000Y-142250000D03"
  },
  {
    label: "Flash168",
    equation: "X103170000Y-90080000D03"
  },
  {
    label: "Flash169",
    equation: "X81000000Y-96500000D03"
  },
  {
    label: "Flash170",
    equation: "X111500000Y-142000000D03"
  },
  {
    label: "Flash171",
    equation: "X56250000Y-122250000D03"
  },
  {
    label: "Flash172",
    equation: "X59250000Y-129500000D03"
  },
  {
    label: "Flash173",
    equation: "X114500000Y-155750000D03"
  },
  {
    label: "Flash174",
    equation: "X45000000Y-97250000D03"
  },
  {
    label: "Flash175",
    equation: "X92750000Y-144750000D03"
  },
  {
    label: "Flash176",
    equation: "X86250000Y-124750000D03"
  },
  {
    label: "Flash177",
    equation: "X94280000Y-89953000D03"
  },
  {
    label: "Flash178",
    equation: "X102000000Y-149250000D03"
  },
  {
    label: "Flash179",
    equation: "X115750000Y-97250000D03"
  },
  {
    label: "Flash180",
    equation: "X88500000Y-103750000D03"
  },
  {
    label: "Flash181",
    equation: "X117750000Y-103000000D03"
  },
  {
    label: "Flash182",
    equation: "X83250000Y-112250000D03"
  },
  {
    label: "Flash183",
    equation: "X80500000Y-127750000D03"
  },
  {
    label: "Flash184",
    equation: "X104250000Y-114000000D03"
  },
  {
    label: "Flash185",
    equation: "X46000000Y-125500000D03"
  },
  {
    label: "Flash186",
    equation: "X69250000Y-91250000D03"
  },
  {
    label: "Flash187",
    equation: "X42750000Y-122500000D03"
  },
  {
    label: "Flash188",
    equation: "X106750000Y-105000000D03"
  },
  {
    label: "Flash189",
    equation: "X117000000Y-150000000D03"
  },
  {
    label: "Flash190",
    equation: "X107500000Y-113750000D03"
  },
  {
    label: "Flash191",
    equation: "X111500000Y-144500000D03"
  },
  {
    label: "Flash192",
    equation: "X64500000Y-88750000D03"
  },
  {
    label: "Flash193",
    equation: "X57250000Y-108500000D03"
  },
  {
    label: "Flash194",
    equation: "X97250000Y-127750000D03"
  },
  {
    label: "Flash195",
    equation: "X100500000Y-131250000D03"
  },
  {
    label: "Flash196",
    equation: "X100750000Y-134000000D03"
  },
  {
    label: "Flash197",
    equation: "X108750000Y-139500000D03"
  },
  {
    label: "Flash198",
    equation: "X114000000Y-139500000D03"
  },
  {
    label: "Flash199",
    equation: "X43500000Y-128750000D03"
  },
  {
    label: "Flash200",
    equation: "X115500000Y-95250000D03"
  },
  {
    label: "Flash201",
    equation: "X80500000Y-121750000D03"
  },
  {
    label: "Flash202",
    equation: "X85500000Y-113500000D03"
  },
  {
    label: "Flash203",
    equation: "X110790000Y-92620000D03"
  },
  {
    label: "Flash204",
    equation: "X70500000Y-136000000D03"
  },
  {
    label: "Flash205",
    equation: "X43750000Y-130750000D03"
  },
  {
    label: "Flash206",
    equation: "X55250000Y-145750000D03"
  },
  {
    label: "Flash207",
    equation: "X113330000Y-128180000D03"
  },
  {
    label: "Flash208",
    equation: "X47750000Y-154250000D03"
  },
  {
    label: "Flash209",
    equation: "X59750000Y-152750000D03"
  },
  {
    label: "Flash210",
    equation: "X98750000Y-149500000D03"
  },
  {
    label: "Flash211",
    equation: "X72750000Y-131250000D03"
  },
  {
    label: "Flash212",
    equation: "X94153000Y-96557000D03"
  },
  {
    label: "Flash213",
    equation: "X114500000Y-152750000D03"
  },
  {
    label: "Flash214",
    equation: "X98250000Y-136500000D03"
  },
  {
    label: "Flash215",
    equation: "X65070000Y-145960000D03"
  },
  {
    label: "Flash216",
    equation: "X101519000Y-106463000D03"
  },
  {
    label: "Flash217",
    equation: "X56500000Y-155250000D03"
  },
  {
    label: "Flash218",
    equation: "X42750000Y-112000000D03"
  },
  {
    label: "Flash219",
    equation: "X95500000Y-129250000D03"
  },
  {
    label: "Flash220",
    equation: "X66500000Y-89000000D03"
  },
  {
    label: "Flash221",
    equation: "X74000000Y-119250000D03"
  },
  {
    label: "Flash222",
    equation: "X117000000Y-152750000D03"
  },
  {
    label: "Flash223",
    equation: "X46274000Y-108622000D03"
  },
  {
    label: "Flash224",
    equation: "X56000000Y-95500000D03"
  },
  {
    label: "Flash225",
    equation: "X71500000Y-121750000D03"
  },
  {
    label: "Flash226",
    equation: "X59000000Y-94750000D03"
  },
  {
    label: "Flash227",
    equation: "X71750000Y-119000000D03"
  },
  {
    label: "Flash228",
    equation: "X57450000Y-105320000D03"
  },
  {
    label: "Flash229",
    equation: "X86750000Y-150750000D03"
  },
  {
    label: "Flash230",
    equation: "X65000000Y-155250000D03"
  },
  {
    label: "Flash231",
    equation: "X109000000Y-150000000D03"
  },
  {
    label: "Flash232",
    equation: "X74000000Y-122000000D03"
  },
  {
    label: "Flash233",
    equation: "X108750000Y-107250000D03"
  },
  {
    label: "Flash234",
    equation: "X104250000Y-111250000D03"
  },
  {
    label: "Flash235",
    equation: "X43000000Y-109750000D03"
  },
  {
    label: "Flash236",
    equation: "X96500000Y-133750000D03"
  },
  {
    label: "Flash237",
    equation: "X104750000Y-108750000D03"
  },
  {
    label: "Flash238",
    equation: "X45000000Y-99750000D03"
  },
  {
    label: "Flash239",
    equation: "X86750000Y-102250000D03"
  },
  {
    label: "Flash240",
    equation: "X106500000Y-111250000D03"
  },
  {
    label: "Flash241",
    equation: "X83000000Y-110000000D03"
  },
  {
    label: "Flash242",
    equation: "X66750000Y-91500000D03"
  },
  {
    label: "Flash243",
    equation: "X58250000Y-127500000D03"
  },
  {
    label: "Flash244",
    equation: "X87000000Y-134750000D03"
  },
  {
    label: "Flash245",
    equation: "X60000000Y-154750000D03"
  },
  {
    label: "Flash246",
    equation: "X98250000Y-147250000D03"
  },
  {
    label: "Flash247",
    equation: "X93391000Y-157644000D03"
  },
  {
    label: "Flash248",
    equation: "X55500000Y-131500000D03"
  },
  {
    label: "Flash249",
    equation: "X58000000Y-88500000D03"
  },
  {
    label: "Flash250",
    equation: "X44500000Y-159000000D03"
  },
  {
    label: "Flash251",
    equation: "X80750000Y-124250000D03"
  },
  {
    label: "Flash252",
    equation: "X104948000Y-99859000D03"
  },
  {
    label: "Flash253",
    equation: "X80000000Y-109250000D03"
  },
  {
    label: "Flash254",
    equation: "X57750000Y-110250000D03"
  },
  {
    label: "Flash255",
    equation: "X91500000Y-129750000D03"
  },
  {
    label: "Flash256",
    equation: "X89000000Y-130000000D03"
  },
  {
    label: "Flash257",
    equation: "X92500000Y-149000000D03"
  },
  {
    label: "Flash258",
    equation: "X90250000Y-103500000D03"
  },
  {
    label: "Flash259",
    equation: "X72690000Y-138340000D03"
  },
  {
    label: "Flash260",
    equation: "X111500000Y-139500000D03"
  },
  {
    label: "Flash261",
    equation: "X117000000Y-134750000D03"
  },
  {
    label: "Flash262",
    equation: "X117750000Y-92500000D03"
  },
  {
    label: "Flash263",
    equation: "X56750000Y-152750000D03"
  },
  {
    label: "Flash264",
    equation: "X71000000Y-129250000D03"
  },
  {
    label: "Flash265",
    equation: "X44500000Y-114000000D03"
  },
  {
    label: "Flash266",
    equation: "X114000000Y-113500000D03"
  },
  {
    label: "Flash267",
    equation: "X103250000Y-129750000D03"
  },
  {
    label: "Flash268",
    equation: "X91750000Y-123000000D03"
  },
  {
    label: "Flash269",
    equation: "X85390000Y-148500000D03"
  },
  {
    label: "Flash270",
    equation: "X67000000Y-96500000D03"
  },
  {
    label: "Flash271",
    equation: "X80000000Y-111750000D03"
  },
  {
    label: "Flash272",
    equation: "X83500000Y-128000000D03"
  },
  {
    label: "Flash273",
    equation: "X84750000Y-132250000D03"
  },
  {
    label: "Flash274",
    equation: "X42250000Y-105500000D03"
  },
  {
    label: "Flash275",
    equation: "X98250000Y-102500000D03"
  },
  {
    label: "Flash276",
    equation: "X87930000Y-143420000D03"
  },
  {
    label: "Flash277",
    equation: "X108750000Y-142000000D03"
  },
  {
    label: "Flash278",
    equation: "X53750000Y-152750000D03"
  },
  {
    label: "Flash279",
    equation: "X112750000Y-102500000D03"
  },
  {
    label: "Flash280",
    equation: "X108750000Y-158750000D03"
  },
  {
    label: "Flash281",
    equation: "X99500000Y-158250000D03"
  },
  {
    label: "Flash282",
    equation: "X108250000Y-130720000D03"
  },
  {
    label: "Flash283",
    equation: "X95250000Y-157250000D03"
  },
  {
    label: "Flash284",
    equation: "X102250000Y-121750000D03"
  },
  {
    label: "Flash285",
    equation: "X95250000Y-103000000D03"
  },
  {
    label: "Flash286",
    equation: "X108250000Y-90080000D03"
  },
  {
    label: "Flash287",
    equation: "X45250000Y-94000000D03"
  },
  {
    label: "Flash288",
    equation: "X69750000Y-104750000D03"
  },
  {
    label: "Flash289",
    equation: "X83000000Y-115750000D03"
  },
  {
    label: "Flash290",
    equation: "X110790000Y-118020000D03"
  },
  {
    label: "Flash291",
    equation: "X57250000Y-129000000D03"
  },
  {
    label: "Flash292",
    equation: "X72750000Y-101500000D03"
  },
  {
    label: "Flash293",
    equation: "X92250000Y-97500000D03"
  },
  {
    label: "Flash294",
    equation: "X72750000Y-94000000D03"
  },
  {
    label: "Flash295",
    equation: "X96500000Y-149250000D03"
  },
  {
    label: "Flash296",
    equation: "X70750000Y-124500000D03"
  },
  {
    label: "Flash297",
    equation: "X117000000Y-142000000D03"
  },
  {
    label: "Flash298",
    equation: "X42500000Y-157250000D03"
  },
  {
    label: "Flash299",
    equation: "X111750000Y-150000000D03"
  },
  {
    label: "Flash300",
    equation: "X116000000Y-100750000D03"
  },
  {
    label: "Flash301",
    equation: "X59990000Y-102780000D03"
  },
  {
    label: "Flash302",
    equation: "X65070000Y-112940000D03"
  },
  {
    label: "Flash303",
    equation: "X108250000Y-104750000D03"
  },
  {
    label: "Flash304",
    equation: "X108750000Y-144500000D03"
  },
  {
    label: "Flash305",
    equation: "X80310000Y-148500000D03"
  },
  {
    label: "Flash306",
    equation: "X42750000Y-94000000D03"
  },
  {
    label: "Flash307",
    equation: "X45250000Y-91000000D03"
  },
  {
    label: "Flash308",
    equation: "X44750000Y-112000000D03"
  },
  {
    label: "Flash309",
    equation: "X57500000Y-118750000D03"
  },
  {
    label: "Flash310",
    equation: "X108750000Y-152750000D03"
  },
  {
    label: "Flash311",
    equation: "X43000000Y-107500000D03"
  },
  {
    label: "Flash312",
    equation: "X57450000Y-100240000D03"
  },
  {
    label: "Flash313",
    equation: "X62250000Y-94000000D03"
  },
  {
    label: "Flash314",
    equation: "X75750000Y-131500000D03"
  },
  {
    label: "Flash315",
    equation: "X85390000Y-143420000D03"
  },
  {
    label: "Flash316",
    equation: "X61000000Y-88500000D03"
  },
  {
    label: "Flash317",
    equation: "X42500000Y-88000000D03"
  },
  {
    label: "Flash318",
    equation: "X109500000Y-105250000D03"
  },
  {
    label: "Flash319",
    equation: "X80000000Y-107250000D03"
  },
  {
    label: "Flash320",
    equation: "X97000000Y-119750000D03"
  },
  {
    label: "Flash321",
    equation: "X95500000Y-125750000D03"
  },
  {
    label: "Flash322",
    equation: "X62530000Y-100240000D03"
  },
  {
    label: "Flash323",
    equation: "X42000000Y-114750000D03"
  },
  {
    label: "Flash324",
    equation: "X93500000Y-127500000D03"
  },
  {
    label: "Flash325",
    equation: "X70150000Y-112940000D03"
  },
  {
    label: "Flash326",
    equation: "X62530000Y-105320000D03"
  },
  {
    label: "Flash327",
    equation: "X54750000Y-127500000D03"
  },
  {
    label: "Flash328",
    equation: "X52250000Y-158750000D03"
  },
  {
    label: "Flash329",
    equation: "X44000000Y-108500000D03"
  },
  {
    label: "Flash330",
    equation: "X97500000Y-100750000D03"
  },
  {
    label: "Flash331",
    equation: "X67250000Y-124500000D03"
  },
  {
    label: "Flash332",
    equation: "X80500000Y-118750000D03"
  },
  {
    label: "Flash333",
    equation: "X93500000Y-131250000D03"
  },
  {
    label: "Flash334",
    equation: "X54750000Y-124750000D03"
  },
  {
    label: "Flash335",
    equation: "X42500000Y-90750000D03"
  },
  {
    label: "Flash336",
    equation: "X90470000Y-148500000D03"
  },
  {
    label: "Flash337",
    equation: "X73000000Y-104250000D03"
  },
  {
    label: "Flash338",
    equation: "X117000000Y-139500000D03"
  },
  {
    label: "Flash339",
    equation: "X73500000Y-108250000D03"
  },
  {
    label: "Flash340",
    equation: "X97250000Y-118250000D03"
  },
  {
    label: "Flash341",
    equation: "X77000000Y-97000000D03"
  },
  {
    label: "Flash342",
    equation: "X102250000Y-145000000D03"
  },
  {
    label: "Flash343",
    equation: "X55500000Y-89250000D03"
  },
  {
    label: "Flash344",
    equation: "X65250000Y-152500000D03"
  },
  {
    label: "Flash345",
    equation: "X105250000Y-103250000D03"
  },
  {
    label: "Flash346",
    equation: "X110790000Y-130720000D03"
  },
  {
    label: "Flash347",
    equation: "X111750000Y-158500000D03"
  },
  {
    label: "Flash348",
    equation: "X73750000Y-129250000D03"
  },
  {
    label: "Flash349",
    equation: "X80500000Y-115500000D03"
  },
  {
    label: "Flash350",
    equation: "X54500000Y-119750000D03"
  },
  {
    label: "Flash351",
    equation: "X87930000Y-145960000D03"
  },
  {
    label: "Flash352",
    equation: "X117250000Y-114000000D03"
  },
  {
    label: "Flash353",
    equation: "X89250000Y-124500000D03"
  },
  {
    label: "Flash354",
    equation: "X102000000Y-119250000D03"
  },
  {
    label: "Flash355",
    equation: "X42750000Y-125500000D03"
  },
  {
    label: "Flash356",
    equation: "X93250000Y-154250000D03"
  },
  {
    label: "Flash357",
    equation: "X61750000Y-158500000D03"
  },
  {
    label: "Flash358",
    equation: "X44500000Y-157000000D03"
  },
  {
    label: "Flash359",
    equation: "X98750000Y-151250000D03"
  },
  {
    label: "Flash360",
    equation: "X62750000Y-91500000D03"
  },
  {
    label: "Flash361",
    equation: "X94250000Y-88250000D03"
  },
  {
    label: "Flash362",
    equation: "X117000000Y-158500000D03"
  },
  {
    label: "Flash363",
    equation: "X96250000Y-142250000D03"
  },
  {
    label: "Flash364",
    equation: "X96000000Y-145000000D03"
  },
  {
    label: "Flash365",
    equation: "X113330000Y-123100000D03"
  },
  {
    label: "Flash366",
    equation: "X105710000Y-118020000D03"
  },
  {
    label: "Flash367",
    equation: "X117000000Y-137000000D03"
  },
  {
    label: "Flash368",
    equation: "X69500000Y-96000000D03"
  },
  {
    label: "Flash369",
    equation: "X84750000Y-134500000D03"
  },
  {
    label: "Flash370",
    equation: "X104500000Y-96750000D03"
  },
  {
    label: "Flash371",
    equation: "X84750000Y-100250000D03"
  },
  {
    label: "Flash372",
    equation: "X45000000Y-146250000D03"
  },
  {
    label: "Flash373",
    equation: "X117750000Y-99000000D03"
  },
  {
    label: "Flash374",
    equation: "X98250000Y-142500000D03"
  },
  {
    label: "Flash375",
    equation: "X93750000Y-103500000D03"
  },
  {
    label: "Flash376",
    equation: "X76500000Y-101250000D03"
  },
  {
    label: "Flash377",
    equation: "X117750000Y-89250000D03"
  },
  {
    label: "Flash378",
    equation: "X99250000Y-129750000D03"
  },
  {
    label: "Flash379",
    equation: "X68499000Y-148500000D03"
  },
  {
    label: "Flash380",
    equation: "X103000000Y-132500000D03"
  },
  {
    label: "Flash381",
    equation: "X104440000Y-92493000D03"
  },
  {
    label: "Flash382",
    equation: "X68750000Y-88250000D03"
  },
  {
    label: "Flash383",
    equation: "X55250000Y-158750000D03"
  },
  {
    label: "Flash384",
    equation: "X80310000Y-145960000D03"
  },
  {
    label: "Flash385",
    equation: "X95250000Y-100250000D03"
  },
  {
    label: "Flash386",
    equation: "X62750000Y-155250000D03"
  },
  {
    label: "Flash387",
    equation: "X82750000Y-107750000D03"
  },
  {
    label: "Flash388",
    equation: "X114750000Y-109000000D03"
  },
  {
    label: "Flash389",
    equation: "X42750000Y-154750000D03"
  },
  {
    label: "Flash390",
    equation: "X97250000Y-155500000D03"
  },
  {
    label: "Flash391",
    equation: "X111750000Y-152750000D03"
  },
  {
    label: "Flash392",
    equation: "X85474500Y-110500000D03"
  },
  {
    label: "Flash393",
    equation: "X88750000Y-114550500D03"
  },
  {
    label: "Flash394",
    equation: "X86000000Y-138750000D03"
  },
  {
    label: "Flash395",
    equation: "X77770000Y-140880000D03"
  },
  {
    label: "Flash396",
    equation: "X100078872Y-109494628D03"
  },
  {
    label: "Flash397",
    equation: "X81180000Y-134930000D03"
  },
  {
    label: "Flash398",
    equation: "X80750000Y-103750000D03"
  },
  {
    label: "Flash399",
    equation: "X98250000Y-111750000D03"
  },
  {
    label: "Flash400",
    equation: "X98250000Y-118500000D03"
  },
  {
    label: "Flash401",
    equation: "X80310000Y-126500000D03"
  },
  {
    label: "Flash402",
    equation: "X99750000Y-101000000D03"
  },
  {
    label: "Flash403",
    equation: "X99500500Y-111289000D03"
  },
  {
    label: "Flash404",
    equation: "X98471000Y-111035000D03"
  },
  {
    label: "Flash405",
    equation: "X100884000Y-111289000D03"
  },
  {
    label: "Flash406",
    equation: "X97328000Y-109257000D03"
  },
  {
    label: "Flash407",
    equation: "X75750000Y-125750000D03"
  },
  {
    label: "Flash408",
    equation: "X90750000Y-116000000D03"
  },
  {
    label: "Flash409",
    equation: "X76250000Y-114500000D03"
  },
  {
    label: "Flash410",
    equation: "X93250000Y-115250000D03"
  },
  {
    label: "Flash411",
    equation: "X75750000Y-115500000D03"
  },
  {
    label: "Flash412",
    equation: "X52500000Y-156500000D03"
  },
  {
    label: "Flash413",
    equation: "X102916000Y-139991000D03"
  },
  {
    label: "Flash414",
    equation: "X98500000Y-154250000D03"
  },
  {
    label: "Line7",
    equation: "X97750000Y-109679000D02"
  },
  {
    label: "LineDraw8",
    equation: "X97328000Y-109257000D01"
  },
  {
    label: "Line9",
    equation: "X97750000Y-111000000D02"
  },
  {
    label: "LineDraw10",
    equation: "X97750000Y-109679000D01"
  },
  {
    label: "Line11",
    equation: "X94500000Y-121750000D02"
  },
  {
    label: "LineDraw12",
    equation: "X94500000Y-114250000D01"
  },
  {
    label: "Line13",
    equation: "X90500000Y-125750000D02"
  },
  {
    label: "LineDraw14",
    equation: "X94500000Y-121750000D01"
  },
  {
    label: "Line15",
    equation: "X75750000Y-125750000D02"
  },
  {
    label: "LineDraw16",
    equation: "X90500000Y-125750000D01"
  },
  {
    label: "Line17",
    equation: "X94500000Y-114250000D02"
  },
  {
    label: "LineDraw18",
    equation: "X97750000Y-111000000D01"
  },
  {
    label: "Line19",
    equation: "X93019305Y-159041000D02"
  },
  {
    label: "LineDraw20",
    equation: "X75081000Y-159041000D01"
  },
  {
    label: "Line21",
    equation: "X94035305Y-158025000D02"
  },
  {
    label: "LineDraw22",
    equation: "X93019305Y-159041000D01"
  },
  {
    label: "Line23",
    equation: "X75081000Y-159041000D02"
  },
  {
    label: "LineDraw24",
    equation: "X72580000Y-156540000D01"
  },
  {
    label: "Line25",
    equation: "X104000000Y-151000000D02"
  },
  {
    label: "LineDraw26",
    equation: "X96975000Y-158025000D01"
  },
  {
    label: "Line27",
    equation: "X96975000Y-158025000D02"
  },
  {
    label: "LineDraw28",
    equation: "X94035305Y-158025000D01"
  },
  {
    label: "Line29",
    equation: "X104000000Y-141075000D02"
  },
  {
    label: "LineDraw30",
    equation: "X104000000Y-151000000D01"
  },
  {
    label: "Line31",
    equation: "X102916000Y-139991000D02"
  },
  {
    label: "LineDraw32",
    equation: "X104000000Y-141075000D01"
  },
  {
    label: "Line33",
    equation: "X66213000Y-128688000D02"
  },
  {
    label: "LineDraw34",
    equation: "X66213000Y-135165000D01"
  },
  {
    label: "Line35",
    equation: "X98598000Y-98335000D02"
  },
  {
    label: "LineDraw36",
    equation: "X102027000Y-94906000D01"
  },
  {
    label: "Line37",
    equation: "X76503305Y-102272000D02"
  },
  {
    label: "LineDraw38",
    equation: "X80440305Y-98335000D01"
  },
  {
    label: "Line39",
    equation: "X80440305Y-98335000D02"
  },
  {
    label: "LineDraw40",
    equation: "X98598000Y-98335000D01"
  },
  {
    label: "Line41",
    equation: "X76119000Y-102272000D02"
  },
  {
    label: "LineDraw42",
    equation: "X76503305Y-102272000D01"
  },
  {
    label: "Line43",
    equation: "X68372000Y-126656000D02"
  },
  {
    label: "LineDraw44",
    equation: "X68372000Y-110019000D01"
  },
  {
    label: "Line45",
    equation: "X68372000Y-110019000D02"
  },
  {
    label: "LineDraw46",
    equation: "X76119000Y-102272000D01"
  },
  {
    label: "Line47",
    equation: "X79800000Y-127010000D02"
  },
  {
    label: "LineDraw48",
    equation: "X80310000Y-126500000D01"
  },
  {
    label: "Line49",
    equation: "X79800000Y-130210000D02"
  },
  {
    label: "LineDraw50",
    equation: "X79800000Y-127010000D01"
  },
  {
    label: "Line51",
    equation: "X82850000Y-133260000D02"
  },
  {
    label: "LineDraw52",
    equation: "X79800000Y-130210000D01"
  },
  {
    label: "Line53",
    equation: "X82850000Y-135800000D02"
  },
  {
    label: "LineDraw54",
    equation: "X82850000Y-133260000D01"
  },
  {
    label: "Line55",
    equation: "X81950000Y-136700000D02"
  },
  {
    label: "LineDraw56",
    equation: "X82850000Y-135800000D01"
  },
  {
    label: "Line57",
    equation: "X71949975Y-133289975D02"
  },
  {
    label: "LineDraw58",
    equation: "X75360000Y-136700000D01"
  },
  {
    label: "Line59",
    equation: "X55476296Y-115486346D02"
  },
  {
    label: "LineDraw60",
    equation: "X71949975Y-131960025D01"
  },
  {
    label: "Line61",
    equation: "X53513654Y-115486346D02"
  },
  {
    label: "LineDraw62",
    equation: "X55476296Y-115486346D01"
  },
  {
    label: "Line63",
    equation: "X52750000Y-116250000D02"
  },
  {
    label: "LineDraw64",
    equation: "X53513654Y-115486346D01"
  },
  {
    label: "Line65",
    equation: "X71949975Y-131960025D02"
  },
  {
    label: "LineDraw66",
    equation: "X71949975Y-133289975D01"
  },
  {
    label: "Line67",
    equation: "X50935000Y-116250000D02"
  },
  {
    label: "LineDraw68",
    equation: "X52750000Y-116250000D01"
  },
  {
    label: "Line69",
    equation: "X49635000Y-117550000D02"
  },
  {
    label: "LineDraw70",
    equation: "X50935000Y-116250000D01"
  },
  {
    label: "Line71",
    equation: "X75360000Y-136700000D02"
  },
  {
    label: "LineDraw72",
    equation: "X81950000Y-136700000D01"
  },
  {
    label: "Line73",
    equation: "X99614000Y-106971000D02"
  },
  {
    label: "LineDraw74",
    equation: "X99614000Y-107733000D01"
  },
  {
    label: "Line75",
    equation: "X100249000Y-106336000D02"
  },
  {
    label: "LineDraw76",
    equation: "X99614000Y-106971000D01"
  },
  {
    label: "Line77",
    equation: "X100078872Y-109494628D02"
  },
  {
    label: "LineDraw78",
    equation: "X100000000Y-109573500D01"
  },
  {
    label: "Line79",
    equation: "X100000000Y-109573500D02"
  },
  {
    label: "LineDraw80",
    equation: "X100000000Y-120010050D01"
  },
  {
    label: "Line81",
    equation: "X99246500Y-111035000D02"
  },
  {
    label: "LineDraw82",
    equation: "X99500500Y-111289000D01"
  },
  {
    label: "Line83",
    equation: "X98471000Y-111035000D02"
  },
  {
    label: "LineDraw84",
    equation: "X99246500Y-111035000D01"
  },
  {
    label: "Line85",
    equation: "X102500000Y-103750000D02"
  },
  {
    label: "LineDraw86",
    equation: "X99750000Y-101000000D01"
  },
  {
    label: "Line87",
    equation: "X102500000Y-108500000D02"
  },
  {
    label: "LineDraw88",
    equation: "X102500000Y-103750000D01"
  },
  {
    label: "Line89",
    equation: "X100884000Y-111289000D02"
  },
  {
    label: "LineDraw90",
    equation: "X102281000Y-109892000D01"
  },
  {
    label: "Line91",
    equation: "X102281000Y-109892000D02"
  },
  {
    label: "LineDraw92",
    equation: "X102281000Y-108719000D01"
  },
  {
    label: "Line93",
    equation: "X102281000Y-108719000D02"
  },
  {
    label: "LineDraw94",
    equation: "X102500000Y-108500000D01"
  },
  {
    label: "Line95",
    equation: "X108631000Y-132371000D02"
  },
  {
    label: "LineDraw96",
    equation: "X108885000Y-132371000D01"
  },
  {
    label: "Line97",
    equation: "X100000000Y-123740000D02"
  },
  {
    label: "LineDraw98",
    equation: "X108631000Y-132371000D01"
  },
  {
    label: "Line99",
    equation: "X100000000Y-120010050D02"
  },
  {
    label: "LineDraw100",
    equation: "X100000000Y-123740000D01"
  },
  {
    label: "Line101",
    equation: "X52175000Y-132790000D02"
  },
  {
    label: "LineDraw102",
    equation: "X56215000Y-128750000D01"
  },
  {
    label: "Line103",
    equation: "X56215000Y-128750000D02"
  },
  {
    label: "LineDraw104",
    equation: "X57500000Y-128750000D01"
  },
  {
    label: "Line105",
    equation: "X44250000Y-108250000D02"
  },
  {
    label: "LineDraw106",
    equation: "X44250000Y-108500000D01"
  },
  {
    label: "Line107",
    equation: "X45110000Y-107390000D02"
  },
  {
    label: "LineDraw108",
    equation: "X44250000Y-108250000D01"
  },
  {
    label: "Line109",
    equation: "X49635000Y-120090000D02"
  },
  {
    label: "LineDraw110",
    equation: "X45590000Y-120090000D01"
  },
  {
    label: "Line111",
    equation: "X45590000Y-120090000D02"
  },
  {
    label: "LineDraw112",
    equation: "X43500000Y-118000000D01"
  },
  {
    label: "Line113",
    equation: "X43500000Y-118000000D02"
  },
  {
    label: "LineDraw114",
    equation: "X43500000Y-117750000D01"
  },
  {
    label: "Line115",
    equation: "X49635000Y-107390000D02"
  },
  {
    label: "LineDraw116",
    equation: "X45110000Y-107390000D01"
  },
  {
    label: "Line117",
    equation: "X44250000Y-108500000D02"
  },
  {
    label: "LineDraw118",
    equation: "X44000000Y-108500000D01"
  },
  {
    label: "Line119",
    equation: "X57500000Y-128750000D02"
  },
  {
    label: "LineDraw120",
    equation: "X57250000Y-129000000D01"
  },
  {
    label: "Line121",
    equation: "X85474500Y-110500000D02"
  },
  {
    label: "LineDraw122",
    equation: "X84775000Y-111199500D01"
  },
  {
    label: "Line123",
    equation: "X88675000Y-114825000D02"
  },
  {
    label: "LineDraw124",
    equation: "X88750000Y-114750000D01"
  },
  {
    label: "Line125",
    equation: "X88750000Y-114750000D02"
  },
  {
    label: "LineDraw126",
    equation: "X88750000Y-114550500D01"
  },
  {
    label: "Line127",
    equation: "X84775000Y-111199500D02"
  },
  {
    label: "LineDraw128",
    equation: "X84775000Y-113850000D01"
  },
  {
    label: "Line129",
    equation: "X85750000Y-114825000D02"
  },
  {
    label: "LineDraw130",
    equation: "X88675000Y-114825000D01"
  },
  {
    label: "Line131",
    equation: "X84775000Y-113850000D02"
  },
  {
    label: "LineDraw132",
    equation: "X85750000Y-114825000D01"
  },
  {
    label: "Line133",
    equation: "X90800000Y-130390000D02"
  },
  {
    label: "LineDraw134",
    equation: "X90800000Y-129210050D01"
  },
  {
    label: "Line135",
    equation: "X90800000Y-129210050D02"
  },
  {
    label: "LineDraw136",
    equation: "X100000000Y-120010050D01"
  },
  {
    label: "Line137",
    equation: "X85250000Y-135510050D02"
  },
  {
    label: "LineDraw138",
    equation: "X86710050Y-134050000D01"
  },
  {
    label: "Line139",
    equation: "X77770000Y-140880000D02"
  },
  {
    label: "LineDraw140",
    equation: "X82370000Y-140880000D01"
  },
  {
    label: "Line141",
    equation: "X86710050Y-134050000D02"
  },
  {
    label: "LineDraw142",
    equation: "X87140000Y-134050000D01"
  },
  {
    label: "Line143",
    equation: "X85250000Y-138000000D02"
  },
  {
    label: "LineDraw144",
    equation: "X85250000Y-135510050D01"
  },
  {
    label: "Line145",
    equation: "X87140000Y-134050000D02"
  },
  {
    label: "LineDraw146",
    equation: "X90800000Y-130390000D01"
  },
  {
    label: "Line147",
    equation: "X82370000Y-140880000D02"
  },
  {
    label: "LineDraw148",
    equation: "X85250000Y-138000000D01"
  },
  {
    label: "Line149",
    equation: "X85250000Y-138000000D02"
  },
  {
    label: "LineDraw150",
    equation: "X86000000Y-138750000D01"
  },
  {
    label: "Line151",
    equation: "X81180000Y-134930000D02"
  },
  {
    label: "LineDraw152",
    equation: "X75000000Y-128750000D01"
  },
  {
    label: "Line153",
    equation: "X78000000Y-103750000D02"
  },
  {
    label: "LineDraw154",
    equation: "X80750000Y-103750000D01"
  },
  {
    label: "Line155",
    equation: "X75000000Y-128750000D02"
  },
  {
    label: "LineDraw156",
    equation: "X75000000Y-106750000D01"
  },
  {
    label: "Line157",
    equation: "X75000000Y-106750000D02"
  },
  {
    label: "LineDraw158",
    equation: "X78000000Y-103750000D01"
  },
  {
    label: "Line159",
    equation: "X98250000Y-111750000D02"
  },
  {
    label: "LineDraw160",
    equation: "X98250000Y-118250000D01"
  },
  {
    label: "Line161",
    equation: "X98250000Y-118250000D02"
  },
  {
    label: "LineDraw162",
    equation: "X98250000Y-118500000D01"
  },
  {
    label: "Line163",
    equation: "X86323960Y-116000000D02"
  },
  {
    label: "LineDraw164",
    equation: "X84823960Y-114500000D01"
  },
  {
    label: "Line165",
    equation: "X84823960Y-114500000D02"
  },
  {
    label: "LineDraw166",
    equation: "X76250000Y-114500000D01"
  },
  {
    label: "Line167",
    equation: "X90750000Y-116000000D02"
  },
  {
    label: "LineDraw168",
    equation: "X86323960Y-116000000D01"
  },
  {
    label: "Line169",
    equation: "X77000000Y-116750000D02"
  },
  {
    label: "LineDraw170",
    equation: "X75750000Y-115500000D01"
  },
  {
    label: "Line171",
    equation: "X91750000Y-116750000D02"
  },
  {
    label: "LineDraw172",
    equation: "X93250000Y-115250000D01"
  },
  {
    label: "Line173",
    equation: "X88000000Y-116750000D02"
  },
  {
    label: "LineDraw174",
    equation: "X91750000Y-116750000D01"
  },
  {
    label: "Line175",
    equation: "X88000000Y-116750000D02"
  },
  {
    label: "LineDraw176",
    equation: "X77000000Y-116750000D01"
  },
  {
    label: "Line177",
    equation: "X47750000Y-156500000D02"
  },
  {
    label: "LineDraw178",
    equation: "X43750000Y-152500000D01"
  },
  {
    label: "Line179",
    equation: "X48500000Y-140410000D02"
  },
  {
    label: "LineDraw180",
    equation: "X46550000Y-142360000D01"
  },
  {
    label: "Line181",
    equation: "X46550000Y-142360000D02"
  },
  {
    label: "LineDraw182",
    equation: "X46550000Y-142950000D01"
  },
  {
    label: "Line183",
    equation: "X47290000Y-143690000D02"
  },
  {
    label: "LineDraw184",
    equation: "X46550000Y-142950000D01"
  },
  {
    label: "Line185",
    equation: "X43750000Y-152500000D02"
  },
  {
    label: "LineDraw186",
    equation: "X43750000Y-149500000D01"
  },
  {
    label: "Line187",
    equation: "X47290000Y-145960000D02"
  },
  {
    label: "LineDraw188",
    equation: "X47290000Y-143690000D01"
  },
  {
    label: "Line189",
    equation: "X46550000Y-142950000D02"
  },
  {
    label: "LineDraw190",
    equation: "X49635000Y-142950000D01"
  },
  {
    label: "Line191",
    equation: "X52500000Y-156500000D02"
  },
  {
    label: "LineDraw192",
    equation: "X47750000Y-156500000D01"
  },
  {
    label: "Line193",
    equation: "X43750000Y-149500000D02"
  },
  {
    label: "LineDraw194",
    equation: "X47290000Y-145960000D01"
  },
  {
    label: "Line195",
    equation: "X49635000Y-140410000D02"
  },
  {
    label: "LineDraw196",
    equation: "X48500000Y-140410000D01"
  },
  {
    label: "Line197",
    equation: "X96250000Y-152000000D02"
  },
  {
    label: "LineDraw198",
    equation: "X98250000Y-154000000D01"
  },
  {
    label: "Line199",
    equation: "X77120000Y-152000000D02"
  },
  {
    label: "LineDraw200",
    equation: "X95500000Y-152000000D01"
  },
  {
    label: "Line201",
    equation: "X98250000Y-154000000D02"
  },
  {
    label: "LineDraw202",
    equation: "X98500000Y-154250000D01"
  },
  {
    label: "Line203",
    equation: "X95500000Y-152000000D02"
  },
  {
    label: "LineDraw204",
    equation: "X96250000Y-152000000D01"
  },
  {
    label: "Line205",
    equation: "X75120000Y-154000000D02"
  },
  {
    label: "LineDraw206",
    equation: "X77120000Y-152000000D01"
  },
  {
    label: "Line207",
    equation: "X118987121Y-85782002D02"
  },
  {
    label: "Line208",
    equation: "G01D02"
  },
  {
    label: "LineDraw209",
    equation: "X119033614Y-85835658D01"
  },
  {
    label: "LineDraw210",
    equation: "X119045000Y-85888000D01"
  },
  {
    label: "LineDraw211",
    equation: "X119045000Y-159296000D01"
  },
  {
    label: "LineDraw212",
    equation: "X119024998Y-159364121D01"
  },
  {
    label: "LineDraw213",
    equation: "X118971342Y-159410614D01"
  },
  {
    label: "LineDraw214",
    equation: "X118919000Y-159422000D01"
  },
  {
    label: "LineDraw215",
    equation: "X93838400Y-159422000D01"
  },
  {
    label: "LineDraw216",
    equation: "X93770279Y-159401998D01"
  },
  {
    label: "LineDraw217",
    equation: "X93723786Y-159348342D01"
  },
  {
    label: "LineDraw218",
    equation: "X93713682Y-159278068D01"
  },
  {
    label: "LineDraw219",
    equation: "X93743176Y-159213488D01"
  },
  {
    label: "LineDraw220",
    equation: "X93749305Y-159206904D01"
  },
  {
    label: "LineDraw221",
    equation: "X94260806Y-158695404D01"
  },
  {
    label: "LineDraw222",
    equation: "X94323118Y-158661379D01"
  },
  {
    label: "LineDraw223",
    equation: "X94349901Y-158658500D01"
  },
  {
    label: "LineDraw224",
    equation: "X96896233Y-158658500D01"
  },
  {
    label: "LineDraw225",
    equation: "X96907416Y-158659027D01"
  },
  {
    label: "LineDraw226",
    equation: "X96914909Y-158660702D01"
  },
  {
    label: "LineDraw227",
    equation: "X96922835Y-158660453D01"
  },
  {
    label: "LineDraw228",
    equation: "X96922836Y-158660453D01"
  },
  {
    label: "LineDraw229",
    equation: "X96982986Y-158658562D01"
  },
  {
    label: "LineDraw230",
    equation: "X96986945Y-158658500D01"
  },
  {
    label: "LineDraw231",
    equation: "X97014856Y-158658500D01"
  },
  {
    label: "LineDraw232",
    equation: "X97018791Y-158658003D01"
  },
  {
    label: "LineDraw233",
    equation: "X97018856Y-158657995D01"
  },
  {
    label: "LineDraw234",
    equation: "X97030693Y-158657062D01"
  },
  {
    label: "LineDraw235",
    equation: "X97062951Y-158656048D01"
  },
  {
    label: "LineDraw236",
    equation: "X97066970Y-158655922D01"
  },
  {
    label: "LineDraw237",
    equation: "X97074889Y-158655673D01"
  },
  {
    label: "LineDraw238",
    equation: "X97094343Y-158650021D01"
  },
  {
    label: "LineDraw239",
    equation: "X97113700Y-158646013D01"
  },
  {
    label: "LineDraw240",
    equation: "X97125930Y-158644468D01"
  },
  {
    label: "LineDraw241",
    equation: "X97125931Y-158644468D01"
  },
  {
    label: "LineDraw242",
    equation: "X97133797Y-158643474D01"
  },
  {
    label: "LineDraw243",
    equation: "X97141168Y-158640555D01"
  },
  {
    label: "LineDraw244",
    equation: "X97141170Y-158640555D01"
  },
  {
    label: "LineDraw245",
    equation: "X97174912Y-158627196D01"
  },
  {
    label: "LineDraw246",
    equation: "X97186142Y-158623351D01"
  },
  {
    label: "LineDraw247",
    equation: "X97220983Y-158613229D01"
  },
  {
    label: "LineDraw248",
    equation: "X97220984Y-158613229D01"
  },
  {
    label: "LineDraw249",
    equation: "X97228593Y-158611018D01"
  },
  {
    label: "LineDraw250",
    equation: "X97235412Y-158606985D01"
  },
  {
    label: "LineDraw251",
    equation: "X97235417Y-158606983D01"
  },
  {
    label: "LineDraw252",
    equation: "X97246028Y-158600707D01"
  },
  {
    label: "LineDraw253",
    equation: "X97263776Y-158592012D01"
  },
  {
    label: "LineDraw254",
    equation: "X97282617Y-158584552D01"
  },
  {
    label: "LineDraw255",
    equation: "X97318387Y-158558564D01"
  },
  {
    label: "LineDraw256",
    equation: "X97328307Y-158552048D01"
  },
  {
    label: "LineDraw257",
    equation: "X97359535Y-158533580D01"
  },
  {
    label: "LineDraw258",
    equation: "X97359538Y-158533578D01"
  },
  {
    label: "LineDraw259",
    equation: "X97366362Y-158529542D01"
  },
  {
    label: "LineDraw260",
    equation: "X97380683Y-158515221D01"
  },
  {
    label: "LineDraw261",
    equation: "X97395717Y-158502380D01"
  },
  {
    label: "LineDraw262",
    equation: "X97405694Y-158495131D01"
  },
  {
    label: "LineDraw263",
    equation: "X97412107Y-158490472D01"
  },
  {
    label: "LineDraw264",
    equation: "X97440298Y-158456395D01"
  },
  {
    label: "LineDraw265",
    equation: "X97448288Y-158447616D01"
  },
  {
    label: "LineDraw266",
    equation: "X99145904Y-156750000D01"
  },
  {
    label: "LineDraw267",
    equation: "X102246884Y-156750000D01"
  },
  {
    label: "LineDraw268",
    equation: "X102265314Y-156960655D01"
  },
  {
    label: "LineDraw269",
    equation: "X102266738Y-156965968D01"
  },
  {
    label: "LineDraw270",
    equation: "X102266738Y-156965970D01"
  },
  {
    label: "LineDraw271",
    equation: "X102312693Y-157137474D01"
  },
  {
    label: "LineDraw272",
    equation: "X102320044Y-157164910D01"
  },
  {
    label: "LineDraw273",
    equation: "X102322366Y-157169891D01"
  },
  {
    label: "LineDraw274",
    equation: "X102322367Y-157169892D01"
  },
  {
    label: "LineDraw275",
    equation: "X102402011Y-157340688D01"
  },
  {
    label: "LineDraw276",
    equation: "X102409411Y-157356558D01"
  },
  {
    label: "LineDraw277",
    equation: "X102530699Y-157529776D01"
  },
  {
    label: "LineDraw278",
    equation: "X102680224Y-157679301D01"
  },
  {
    label: "LineDraw279",
    equation: "X102853442Y-157800589D01"
  },
  {
    label: "LineDraw280",
    equation: "X102858420Y-157802910D01"
  },
  {
    label: "LineDraw281",
    equation: "X102858423Y-157802912D01"
  },
  {
    label: "LineDraw282",
    equation: "X103006330Y-157871882D01"
  },
  {
    label: "LineDraw283",
    equation: "X103045090Y-157889956D01"
  },
  {
    label: "LineDraw284",
    equation: "X103050398Y-157891378D01"
  },
  {
    label: "LineDraw285",
    equation: "X103050400Y-157891379D01"
  },
  {
    label: "LineDraw286",
    equation: "X103244030Y-157943262D01"
  },
  {
    label: "LineDraw287",
    equation: "X103244032Y-157943262D01"
  },
  {
    label: "LineDraw288",
    equation: "X103249345Y-157944686D01"
  },
  {
    label: "LineDraw289",
    equation: "X103460000Y-157963116D01"
  },
  {
    label: "LineDraw290",
    equation: "X103670655Y-157944686D01"
  },
  {
    label: "LineDraw291",
    equation: "X103675968Y-157943262D01"
  },
  {
    label: "LineDraw292",
    equation: "X103675970Y-157943262D01"
  },
  {
    label: "LineDraw293",
    equation: "X103869600Y-157891379D01"
  },
  {
    label: "LineDraw294",
    equation: "X103869602Y-157891378D01"
  },
  {
    label: "LineDraw295",
    equation: "X103874910Y-157889956D01"
  },
  {
    label: "LineDraw296",
    equation: "X103913670Y-157871882D01"
  },
  {
    label: "LineDraw297",
    equation: "X104061577Y-157802912D01"
  },
  {
    label: "LineDraw298",
    equation: "X104061580Y-157802910D01"
  },
  {
    label: "LineDraw299",
    equation: "X104066558Y-157800589D01"
  },
  {
    label: "LineDraw300",
    equation: "X104239776Y-157679301D01"
  },
  {
    label: "LineDraw301",
    equation: "X104389301Y-157529776D01"
  },
  {
    label: "LineDraw302",
    equation: "X104510589Y-157356558D01"
  },
  {
    label: "LineDraw303",
    equation: "X104517990Y-157340688D01"
  },
  {
    label: "LineDraw304",
    equation: "X104597633Y-157169892D01"
  },
  {
    label: "LineDraw305",
    equation: "X104597634Y-157169891D01"
  },
  {
    label: "LineDraw306",
    equation: "X104599956Y-157164910D01"
  },
  {
    label: "LineDraw307",
    equation: "X104607308Y-157137474D01"
  },
  {
    label: "LineDraw308",
    equation: "X104608293Y-157133796D01"
  },
  {
    label: "LineDraw309",
    equation: "X104645245Y-157073173D01"
  },
  {
    label: "LineDraw310",
    equation: "X104709106Y-157042152D01"
  },
  {
    label: "LineDraw311",
    equation: "X104779600Y-157050580D01"
  },
  {
    label: "LineDraw312",
    equation: "X104834347Y-157095783D01"
  },
  {
    label: "LineDraw313",
    equation: "X104851707Y-157133796D01"
  },
  {
    label: "LineDraw314",
    equation: "X104852693Y-157137474D01"
  },
  {
    label: "LineDraw315",
    equation: "X104860044Y-157164910D01"
  },
  {
    label: "LineDraw316",
    equation: "X104862366Y-157169891D01"
  },
  {
    label: "LineDraw317",
    equation: "X104862367Y-157169892D01"
  },
  {
    label: "LineDraw318",
    equation: "X104942011Y-157340688D01"
  },
  {
    label: "LineDraw319",
    equation: "X104949411Y-157356558D01"
  },
  {
    label: "LineDraw320",
    equation: "X105070699Y-157529776D01"
  },
  {
    label: "LineDraw321",
    equation: "X105220224Y-157679301D01"
  },
  {
    label: "LineDraw322",
    equation: "X105393442Y-157800589D01"
  },
  {
    label: "LineDraw323",
    equation: "X105398420Y-157802910D01"
  },
  {
    label: "LineDraw324",
    equation: "X105398423Y-157802912D01"
  },
  {
    label: "LineDraw325",
    equation: "X105546330Y-157871882D01"
  },
  {
    label: "LineDraw326",
    equation: "X105585090Y-157889956D01"
  },
  {
    label: "LineDraw327",
    equation: "X105590398Y-157891378D01"
  },
  {
    label: "LineDraw328",
    equation: "X105590400Y-157891379D01"
  },
  {
    label: "LineDraw329",
    equation: "X105784030Y-157943262D01"
  },
  {
    label: "LineDraw330",
    equation: "X105784032Y-157943262D01"
  },
  {
    label: "LineDraw331",
    equation: "X105789345Y-157944686D01"
  },
  {
    label: "LineDraw332",
    equation: "X106000000Y-157963116D01"
  },
  {
    label: "LineDraw333",
    equation: "X106210655Y-157944686D01"
  },
  {
    label: "LineDraw334",
    equation: "X106215968Y-157943262D01"
  },
  {
    label: "LineDraw335",
    equation: "X106215970Y-157943262D01"
  },
  {
    label: "LineDraw336",
    equation: "X106409600Y-157891379D01"
  },
  {
    label: "LineDraw337",
    equation: "X106409602Y-157891378D01"
  },
  {
    label: "LineDraw338",
    equation: "X106414910Y-157889956D01"
  },
  {
    label: "LineDraw339",
    equation: "X106453670Y-157871882D01"
  },
  {
    label: "LineDraw340",
    equation: "X106601577Y-157802912D01"
  },
  {
    label: "LineDraw341",
    equation: "X106601580Y-157802910D01"
  },
  {
    label: "LineDraw342",
    equation: "X106606558Y-157800589D01"
  },
  {
    label: "LineDraw343",
    equation: "X106779776Y-157679301D01"
  },
  {
    label: "LineDraw344",
    equation: "X106929301Y-157529776D01"
  },
  {
    label: "LineDraw345",
    equation: "X107050589Y-157356558D01"
  },
  {
    label: "LineDraw346",
    equation: "X107057990Y-157340688D01"
  },
  {
    label: "LineDraw347",
    equation: "X107137633Y-157169892D01"
  },
  {
    label: "LineDraw348",
    equation: "X107137634Y-157169891D01"
  },
  {
    label: "LineDraw349",
    equation: "X107139956Y-157164910D01"
  },
  {
    label: "LineDraw350",
    equation: "X107147308Y-157137474D01"
  },
  {
    label: "LineDraw351",
    equation: "X107193262Y-156965970D01"
  },
  {
    label: "LineDraw352",
    equation: "X107193262Y-156965968D01"
  },
  {
    label: "LineDraw353",
    equation: "X107194686Y-156960655D01"
  },
  {
    label: "LineDraw354",
    equation: "X107213116Y-156750000D01"
  },
  {
    label: "LineDraw355",
    equation: "X107194686Y-156539345D01"
  },
  {
    label: "LineDraw356",
    equation: "X107187319Y-156511851D01"
  },
  {
    label: "LineDraw357",
    equation: "X107141379Y-156340400D01"
  },
  {
    label: "LineDraw358",
    equation: "X107141378Y-156340398D01"
  },
  {
    label: "LineDraw359",
    equation: "X107139956Y-156335090D01"
  },
  {
    label: "LineDraw360",
    equation: "X107137633Y-156330108D01"
  },
  {
    label: "LineDraw361",
    equation: "X107052912Y-156148423D01"
  },
  {
    label: "LineDraw362",
    equation: "X107052910Y-156148420D01"
  },
  {
    label: "LineDraw363",
    equation: "X107050589Y-156143442D01"
  },
  {
    label: "LineDraw364",
    equation: "X106929301Y-155970224D01"
  },
  {
    label: "LineDraw365",
    equation: "X106779776Y-155820699D01"
  },
  {
    label: "LineDraw366",
    equation: "X106606558Y-155699411D01"
  },
  {
    label: "LineDraw367",
    equation: "X106601580Y-155697090D01"
  },
  {
    label: "LineDraw368",
    equation: "X106601577Y-155697088D01"
  },
  {
    label: "LineDraw369",
    equation: "X106419892Y-155612367D01"
  },
  {
    label: "LineDraw370",
    equation: "X106419891Y-155612366D01"
  },
  {
    label: "LineDraw371",
    equation: "X106414910Y-155610044D01"
  },
  {
    label: "LineDraw372",
    equation: "X106409602Y-155608622D01"
  },
  {
    label: "LineDraw373",
    equation: "X106409600Y-155608621D01"
  },
  {
    label: "LineDraw374",
    equation: "X106215970Y-155556738D01"
  },
  {
    label: "LineDraw375",
    equation: "X106215968Y-155556738D01"
  },
  {
    label: "LineDraw376",
    equation: "X106210655Y-155555314D01"
  },
  {
    label: "LineDraw377",
    equation: "X106000000Y-155536884D01"
  },
  {
    label: "LineDraw378",
    equation: "X105789345Y-155555314D01"
  },
  {
    label: "LineDraw379",
    equation: "X105784032Y-155556738D01"
  },
  {
    label: "LineDraw380",
    equation: "X105784030Y-155556738D01"
  },
  {
    label: "LineDraw381",
    equation: "X105590400Y-155608621D01"
  },
  {
    label: "LineDraw382",
    equation: "X105590398Y-155608622D01"
  },
  {
    label: "LineDraw383",
    equation: "X105585090Y-155610044D01"
  },
  {
    label: "LineDraw384",
    equation: "X105580109Y-155612366D01"
  },
  {
    label: "LineDraw385",
    equation: "X105580108Y-155612367D01"
  },
  {
    label: "LineDraw386",
    equation: "X105398423Y-155697088D01"
  },
  {
    label: "LineDraw387",
    equation: "X105398420Y-155697090D01"
  },
  {
    label: "LineDraw388",
    equation: "X105393442Y-155699411D01"
  },
  {
    label: "LineDraw389",
    equation: "X105220224Y-155820699D01"
  },
  {
    label: "LineDraw390",
    equation: "X105070699Y-155970224D01"
  },
  {
    label: "LineDraw391",
    equation: "X104949411Y-156143442D01"
  },
  {
    label: "LineDraw392",
    equation: "X104947090Y-156148420D01"
  },
  {
    label: "LineDraw393",
    equation: "X104947088Y-156148423D01"
  },
  {
    label: "LineDraw394",
    equation: "X104862367Y-156330108D01"
  },
  {
    label: "LineDraw395",
    equation: "X104860044Y-156335090D01"
  },
  {
    label: "LineDraw396",
    equation: "X104858622Y-156340398D01"
  },
  {
    label: "LineDraw397",
    equation: "X104858621Y-156340400D01"
  },
  {
    label: "LineDraw398",
    equation: "X104851707Y-156366204D01"
  },
  {
    label: "LineDraw399",
    equation: "X104814755Y-156426827D01"
  },
  {
    label: "LineDraw400",
    equation: "X104750894Y-156457848D01"
  },
  {
    label: "LineDraw401",
    equation: "X104680400Y-156449420D01"
  },
  {
    label: "LineDraw402",
    equation: "X104625653Y-156404217D01"
  },
  {
    label: "LineDraw403",
    equation: "X104608293Y-156366204D01"
  },
  {
    label: "LineDraw404",
    equation: "X104601379Y-156340400D01"
  },
  {
    label: "LineDraw405",
    equation: "X104601378Y-156340398D01"
  },
  {
    label: "LineDraw406",
    equation: "X104599956Y-156335090D01"
  },
  {
    label: "LineDraw407",
    equation: "X104597633Y-156330108D01"
  },
  {
    label: "LineDraw408",
    equation: "X104512912Y-156148423D01"
  },
  {
    label: "LineDraw409",
    equation: "X104512910Y-156148420D01"
  },
  {
    label: "LineDraw410",
    equation: "X104510589Y-156143442D01"
  },
  {
    label: "LineDraw411",
    equation: "X104389301Y-155970224D01"
  },
  {
    label: "LineDraw412",
    equation: "X104239776Y-155820699D01"
  },
  {
    label: "LineDraw413",
    equation: "X104066558Y-155699411D01"
  },
  {
    label: "LineDraw414",
    equation: "X104061580Y-155697090D01"
  },
  {
    label: "LineDraw415",
    equation: "X104061577Y-155697088D01"
  },
  {
    label: "LineDraw416",
    equation: "X103879892Y-155612367D01"
  },
  {
    label: "LineDraw417",
    equation: "X103879891Y-155612366D01"
  },
  {
    label: "LineDraw418",
    equation: "X103874910Y-155610044D01"
  },
  {
    label: "LineDraw419",
    equation: "X103869602Y-155608622D01"
  },
  {
    label: "LineDraw420",
    equation: "X103869600Y-155608621D01"
  },
  {
    label: "LineDraw421",
    equation: "X103675970Y-155556738D01"
  },
  {
    label: "LineDraw422",
    equation: "X103675968Y-155556738D01"
  },
  {
    label: "LineDraw423",
    equation: "X103670655Y-155555314D01"
  },
  {
    label: "LineDraw424",
    equation: "X103460000Y-155536884D01"
  },
  {
    label: "LineDraw425",
    equation: "X103249345Y-155555314D01"
  },
  {
    label: "LineDraw426",
    equation: "X103244032Y-155556738D01"
  },
  {
    label: "LineDraw427",
    equation: "X103244030Y-155556738D01"
  },
  {
    label: "LineDraw428",
    equation: "X103050400Y-155608621D01"
  },
  {
    label: "LineDraw429",
    equation: "X103050398Y-155608622D01"
  },
  {
    label: "LineDraw430",
    equation: "X103045090Y-155610044D01"
  },
  {
    label: "LineDraw431",
    equation: "X103040109Y-155612366D01"
  },
  {
    label: "LineDraw432",
    equation: "X103040108Y-155612367D01"
  },
  {
    label: "LineDraw433",
    equation: "X102858423Y-155697088D01"
  },
  {
    label: "LineDraw434",
    equation: "X102858420Y-155697090D01"
  },
  {
    label: "LineDraw435",
    equation: "X102853442Y-155699411D01"
  },
  {
    label: "LineDraw436",
    equation: "X102680224Y-155820699D01"
  },
  {
    label: "LineDraw437",
    equation: "X102530699Y-155970224D01"
  },
  {
    label: "LineDraw438",
    equation: "X102409411Y-156143442D01"
  },
  {
    label: "LineDraw439",
    equation: "X102407090Y-156148420D01"
  },
  {
    label: "LineDraw440",
    equation: "X102407088Y-156148423D01"
  },
  {
    label: "LineDraw441",
    equation: "X102322367Y-156330108D01"
  },
  {
    label: "LineDraw442",
    equation: "X102320044Y-156335090D01"
  },
  {
    label: "LineDraw443",
    equation: "X102318622Y-156340398D01"
  },
  {
    label: "LineDraw444",
    equation: "X102318621Y-156340400D01"
  },
  {
    label: "LineDraw445",
    equation: "X102272681Y-156511851D01"
  },
  {
    label: "LineDraw446",
    equation: "X102265314Y-156539345D01"
  },
  {
    label: "LineDraw447",
    equation: "X102246884Y-156750000D01"
  },
  {
    label: "LineDraw448",
    equation: "X99145904Y-156750000D01"
  },
  {
    label: "LineDraw449",
    equation: "X104392247Y-151503657D01"
  },
  {
    label: "LineDraw450",
    equation: "X104400537Y-151496113D01"
  },
  {
    label: "LineDraw451",
    equation: "X104407018Y-151492000D01"
  },
  {
    label: "LineDraw452",
    equation: "X104453659Y-151442332D01"
  },
  {
    label: "LineDraw453",
    equation: "X104456413Y-151439491D01"
  },
  {
    label: "LineDraw454",
    equation: "X104476134Y-151419770D01"
  },
  {
    label: "LineDraw455",
    equation: "X104478612Y-151416575D01"
  },
  {
    label: "LineDraw456",
    equation: "X104486318Y-151407553D01"
  },
  {
    label: "LineDraw457",
    equation: "X104502832Y-151389967D01"
  },
  {
    label: "LineDraw458",
    equation: "X104516586Y-151375321D01"
  },
  {
    label: "LineDraw459",
    equation: "X104522732Y-151364142D01"
  },
  {
    label: "LineDraw460",
    equation: "X104526346Y-151357568D01"
  },
  {
    label: "LineDraw461",
    equation: "X104537199Y-151341045D01"
  },
  {
    label: "LineDraw462",
    equation: "X104544753Y-151331306D01"
  },
  {
    label: "LineDraw463",
    equation: "X104549613Y-151325041D01"
  },
  {
    label: "LineDraw464",
    equation: "X104567176Y-151284457D01"
  },
  {
    label: "LineDraw465",
    equation: "X104572383Y-151273827D01"
  },
  {
    label: "LineDraw466",
    equation: "X104593695Y-151235060D01"
  },
  {
    label: "LineDraw467",
    equation: "X104595666Y-151227383D01"
  },
  {
    label: "LineDraw468",
    equation: "X104595668Y-151227378D01"
  },
  {
    label: "LineDraw469",
    equation: "X104598732Y-151215442D01"
  },
  {
    label: "LineDraw470",
    equation: "X104605138Y-151196730D01"
  },
  {
    label: "LineDraw471",
    equation: "X104610033Y-151185419D01"
  },
  {
    label: "LineDraw472",
    equation: "X104613181Y-151178145D01"
  },
  {
    label: "LineDraw473",
    equation: "X104614421Y-151170317D01"
  },
  {
    label: "LineDraw474",
    equation: "X104614423Y-151170310D01"
  },
  {
    label: "LineDraw475",
    equation: "X104620099Y-151134476D01"
  },
  {
    label: "LineDraw476",
    equation: "X104622505Y-151122856D01"
  },
  {
    label: "LineDraw477",
    equation: "X104631528Y-151087711D01"
  },
  {
    label: "LineDraw478",
    equation: "X104631528Y-151087710D01"
  },
  {
    label: "LineDraw479",
    equation: "X104633500Y-151080030D01"
  },
  {
    label: "LineDraw480",
    equation: "X104633500Y-151059776D01"
  },
  {
    label: "LineDraw481",
    equation: "X104635051Y-151040065D01"
  },
  {
    label: "LineDraw482",
    equation: "X104636980Y-151027886D01"
  },
  {
    label: "LineDraw483",
    equation: "X104638220Y-151020057D01"
  },
  {
    label: "LineDraw484",
    equation: "X104634059Y-150976038D01"
  },
  {
    label: "LineDraw485",
    equation: "X104633500Y-150964181D01"
  },
  {
    label: "LineDraw486",
    equation: "X104633500Y-141153768D01"
  },
  {
    label: "LineDraw487",
    equation: "X104634027Y-141142585D01"
  },
  {
    label: "LineDraw488",
    equation: "X104635702Y-141135092D01"
  },
  {
    label: "LineDraw489",
    equation: "X104633562Y-141067001D01"
  },
  {
    label: "LineDraw490",
    equation: "X104633500Y-141063044D01"
  },
  {
    label: "LineDraw491",
    equation: "X104633500Y-141035144D01"
  },
  {
    label: "LineDraw492",
    equation: "X104632996Y-141031153D01"
  },
  {
    label: "LineDraw493",
    equation: "X104632063Y-141019311D01"
  },
  {
    label: "LineDraw494",
    equation: "X104630923Y-140983036D01"
  },
  {
    label: "LineDraw495",
    equation: "X104630674Y-140975111D01"
  },
  {
    label: "LineDraw496",
    equation: "X104625021Y-140955652D01"
  },
  {
    label: "LineDraw497",
    equation: "X104621012Y-140936293D01"
  },
  {
    label: "LineDraw498",
    equation: "X104620846Y-140934983D01"
  },
  {
    label: "LineDraw499",
    equation: "X104618474Y-140916203D01"
  },
  {
    label: "LineDraw500",
    equation: "X104615558Y-140908837D01"
  },
  {
    label: "LineDraw501",
    equation: "X104615556Y-140908831D01"
  },
  {
    label: "LineDraw502",
    equation: "X104602200Y-140875098D01"
  },
  {
    label: "LineDraw503",
    equation: "X104598355Y-140863868D01"
  },
  {
    label: "LineDraw504",
    equation: "X104588230Y-140829017D01"
  },
  {
    label: "LineDraw505",
    equation: "X104588230Y-140829016D01"
  },
  {
    label: "LineDraw506",
    equation: "X104586019Y-140821407D01"
  },
  {
    label: "LineDraw507",
    equation: "X104575705Y-140803966D01"
  },
  {
    label: "LineDraw508",
    equation: "X104567008Y-140786213D01"
  },
  {
    label: "LineDraw509",
    equation: "X104562472Y-140774758D01"
  },
  {
    label: "LineDraw510",
    equation: "X104559552Y-140767383D01"
  },
  {
    label: "LineDraw511",
    equation: "X104533563Y-140731612D01"
  },
  {
    label: "LineDraw512",
    equation: "X104527047Y-140721692D01"
  },
  {
    label: "LineDraw513",
    equation: "X104516006Y-140703023D01"
  },
  {
    label: "LineDraw514",
    equation: "X104504542Y-140683638D01"
  },
  {
    label: "LineDraw515",
    equation: "X104490221Y-140669317D01"
  },
  {
    label: "LineDraw516",
    equation: "X104477380Y-140654283D01"
  },
  {
    label: "LineDraw517",
    equation: "X104470131Y-140644306D01"
  },
  {
    label: "LineDraw518",
    equation: "X104465472Y-140637893D01"
  },
  {
    label: "LineDraw519",
    equation: "X104431395Y-140609702D01"
  },
  {
    label: "LineDraw520",
    equation: "X104422616Y-140601712D01"
  },
  {
    label: "LineDraw521",
    equation: "X103863122Y-140042218D01"
  },
  {
    label: "LineDraw522",
    equation: "X103829096Y-139979906D01"
  },
  {
    label: "LineDraw523",
    equation: "X103826907Y-139966293D01"
  },
  {
    label: "LineDraw524",
    equation: "X103826872Y-139965954D01"
  },
  {
    label: "LineDraw525",
    equation: "X103809542Y-139801072D01"
  },
  {
    label: "LineDraw526",
    equation: "X103750527Y-139619444D01"
  },
  {
    label: "LineDraw527",
    equation: "X103655040Y-139454056D01"
  },
  {
    label: "LineDraw528",
    equation: "X103527253Y-139312134D01"
  },
  {
    label: "LineDraw529",
    equation: "X103372752Y-139199882D01"
  },
  {
    label: "LineDraw530",
    equation: "X103366724Y-139197198D01"
  },
  {
    label: "LineDraw531",
    equation: "X103366722Y-139197197D01"
  },
  {
    label: "LineDraw532",
    equation: "X103204319Y-139124891D01"
  },
  {
    label: "LineDraw533",
    equation: "X103204318Y-139124891D01"
  },
  {
    label: "LineDraw534",
    equation: "X103198288Y-139122206D01"
  },
  {
    label: "LineDraw535",
    equation: "X103104888Y-139102353D01"
  },
  {
    label: "LineDraw536",
    equation: "X103017944Y-139083872D01"
  },
  {
    label: "LineDraw537",
    equation: "X103017939Y-139083872D01"
  },
  {
    label: "LineDraw538",
    equation: "X103011487Y-139082500D01"
  },
  {
    label: "LineDraw539",
    equation: "X102820513Y-139082500D01"
  },
  {
    label: "LineDraw540",
    equation: "X102814061Y-139083872D01"
  },
  {
    label: "LineDraw541",
    equation: "X102814056Y-139083872D01"
  },
  {
    label: "LineDraw542",
    equation: "X102727112Y-139102353D01"
  },
  {
    label: "LineDraw543",
    equation: "X102633712Y-139122206D01"
  },
  {
    label: "LineDraw544",
    equation: "X102627682Y-139124891D01"
  },
  {
    label: "LineDraw545",
    equation: "X102627681Y-139124891D01"
  },
  {
    label: "LineDraw546",
    equation: "X102465278Y-139197197D01"
  },
  {
    label: "LineDraw547",
    equation: "X102465276Y-139197198D01"
  },
  {
    label: "LineDraw548",
    equation: "X102459248Y-139199882D01"
  },
  {
    label: "LineDraw549",
    equation: "X102304747Y-139312134D01"
  },
  {
    label: "LineDraw550",
    equation: "X102176960Y-139454056D01"
  },
  {
    label: "LineDraw551",
    equation: "X102081473Y-139619444D01"
  },
  {
    label: "LineDraw552",
    equation: "X102022458Y-139801072D01"
  },
  {
    label: "LineDraw553",
    equation: "X102021768Y-139807633D01"
  },
  {
    label: "LineDraw554",
    equation: "X102021768Y-139807635D01"
  },
  {
    label: "LineDraw555",
    equation: "X102004401Y-139972872D01"
  },
  {
    label: "LineDraw556",
    equation: "X102002496Y-139991000D01"
  },
  {
    label: "LineDraw557",
    equation: "X102003186Y-139997565D01"
  },
  {
    label: "LineDraw558",
    equation: "X102013192Y-140092763D01"
  },
  {
    label: "LineDraw559",
    equation: "X102022458Y-140180928D01"
  },
  {
    label: "LineDraw560",
    equation: "X102081473Y-140362556D01"
  },
  {
    label: "LineDraw561",
    equation: "X102176960Y-140527944D01"
  },
  {
    label: "LineDraw562",
    equation: "X102181378Y-140532851D01"
  },
  {
    label: "LineDraw563",
    equation: "X102181379Y-140532852D01"
  },
  {
    label: "LineDraw564",
    equation: "X102250575Y-140609702D01"
  },
  {
    label: "LineDraw565",
    equation: "X102304747Y-140669866D01"
  },
  {
    label: "LineDraw566",
    equation: "X102343565Y-140698069D01"
  },
  {
    label: "LineDraw567",
    equation: "X102430138Y-140760968D01"
  },
  {
    label: "LineDraw568",
    equation: "X102459248Y-140782118D01"
  },
  {
    label: "LineDraw569",
    equation: "X102465276Y-140784802D01"
  },
  {
    label: "LineDraw570",
    equation: "X102465278Y-140784803D01"
  },
  {
    label: "LineDraw571",
    equation: "X102564585Y-140829017D01"
  },
  {
    label: "LineDraw572",
    equation: "X102633712Y-140859794D01"
  },
  {
    label: "LineDraw573",
    equation: "X102727113Y-140879647D01"
  },
  {
    label: "LineDraw574",
    equation: "X102814056Y-140898128D01"
  },
  {
    label: "LineDraw575",
    equation: "X102814061Y-140898128D01"
  },
  {
    label: "LineDraw576",
    equation: "X102820513Y-140899500D01"
  },
  {
    label: "LineDraw577",
    equation: "X102876406Y-140899500D01"
  },
  {
    label: "LineDraw578",
    equation: "X102944527Y-140919502D01"
  },
  {
    label: "LineDraw579",
    equation: "X102965501Y-140936405D01"
  },
  {
    label: "LineDraw580",
    equation: "X103329595Y-141300499D01"
  },
  {
    label: "LineDraw581",
    equation: "X103363621Y-141362811D01"
  },
  {
    label: "LineDraw582",
    equation: "X103366500Y-141389594D01"
  },
  {
    label: "LineDraw583",
    equation: "X103366500Y-150685405D01"
  },
  {
    label: "LineDraw584",
    equation: "X103346498Y-150753526D01"
  },
  {
    label: "LineDraw585",
    equation: "X103329595Y-150774500D01"
  },
  {
    label: "LineDraw586",
    equation: "X99613355Y-154490740D01"
  },
  {
    label: "LineDraw587",
    equation: "X99551043Y-154524766D01"
  },
  {
    label: "LineDraw588",
    equation: "X99480228Y-154519701D01"
  },
  {
    label: "LineDraw589",
    equation: "X99423392Y-154477154D01"
  },
  {
    label: "LineDraw590",
    equation: "X99398581Y-154410634D01"
  },
  {
    label: "LineDraw591",
    equation: "X99398950Y-154388475D01"
  },
  {
    label: "LineDraw592",
    equation: "X99412814Y-154256565D01"
  },
  {
    label: "LineDraw593",
    equation: "X99413504Y-154250000D01"
  },
  {
    label: "LineDraw594",
    equation: "X99393542Y-154060072D01"
  },
  {
    label: "LineDraw595",
    equation: "X99334527Y-153878444D01"
  },
  {
    label: "LineDraw596",
    equation: "X99239040Y-153713056D01"
  },
  {
    label: "LineDraw597",
    equation: "X99111253Y-153571134D01"
  },
  {
    label: "LineDraw598",
    equation: "X98956752Y-153458882D01"
  },
  {
    label: "LineDraw599",
    equation: "X98950724Y-153456198D01"
  },
  {
    label: "LineDraw600",
    equation: "X98950722Y-153456197D01"
  },
  {
    label: "LineDraw601",
    equation: "X98788319Y-153383891D01"
  },
  {
    label: "LineDraw602",
    equation: "X98788318Y-153383891D01"
  },
  {
    label: "LineDraw603",
    equation: "X98782288Y-153381206D01"
  },
  {
    label: "LineDraw604",
    equation: "X98685298Y-153360590D01"
  },
  {
    label: "LineDraw605",
    equation: "X98601944Y-153342872D01"
  },
  {
    label: "LineDraw606",
    equation: "X98601939Y-153342872D01"
  },
  {
    label: "LineDraw607",
    equation: "X98595487Y-153341500D01"
  },
  {
    label: "LineDraw608",
    equation: "X98539594Y-153341500D01"
  },
  {
    label: "LineDraw609",
    equation: "X98471473Y-153321498D01"
  },
  {
    label: "LineDraw610",
    equation: "X98450499Y-153304595D01"
  },
  {
    label: "LineDraw611",
    equation: "X96753652Y-151607747D01"
  },
  {
    label: "LineDraw612",
    equation: "X96746112Y-151599461D01"
  },
  {
    label: "LineDraw613",
    equation: "X96742000Y-151592982D01"
  },
  {
    label: "LineDraw614",
    equation: "X96692348Y-151546356D01"
  },
  {
    label: "LineDraw615",
    equation: "X96689507Y-151543602D01"
  },
  {
    label: "LineDraw616",
    equation: "X96669770Y-151523865D01"
  },
  {
    label: "LineDraw617",
    equation: "X96666573Y-151521385D01"
  },
  {
    label: "LineDraw618",
    equation: "X96657551Y-151513680D01"
  },
  {
    label: "LineDraw619",
    equation: "X96638370Y-151495668D01"
  },
  {
    label: "LineDraw620",
    equation: "X96625321Y-151483414D01"
  },
  {
    label: "LineDraw621",
    equation: "X96618375Y-151479595D01"
  },
  {
    label: "LineDraw622",
    equation: "X96618372Y-151479593D01"
  },
  {
    label: "LineDraw623",
    equation: "X96607566Y-151473652D01"
  },
  {
    label: "LineDraw624",
    equation: "X96591047Y-151462801D01"
  },
  {
    label: "LineDraw625",
    equation: "X96590583Y-151462441D01"
  },
  {
    label: "LineDraw626",
    equation: "X96575041Y-151450386D01"
  },
  {
    label: "LineDraw627",
    equation: "X96567772Y-151447241D01"
  },
  {
    label: "LineDraw628",
    equation: "X96567768Y-151447238D01"
  },
  {
    label: "LineDraw629",
    equation: "X96534463Y-151432826D01"
  },
  {
    label: "LineDraw630",
    equation: "X96523813Y-151427609D01"
  },
  {
    label: "LineDraw631",
    equation: "X96485060Y-151406305D01"
  },
  {
    label: "LineDraw632",
    equation: "X96465437Y-151401267D01"
  },
  {
    label: "LineDraw633",
    equation: "X96446734Y-151394863D01"
  },
  {
    label: "LineDraw634",
    equation: "X96435420Y-151389967D01"
  },
  {
    label: "LineDraw635",
    equation: "X96435419Y-151389967D01"
  },
  {
    label: "LineDraw636",
    equation: "X96428145Y-151386819D01"
  },
  {
    label: "LineDraw637",
    equation: "X96420322Y-151385580D01"
  },
  {
    label: "LineDraw638",
    equation: "X96420312Y-151385577D01"
  },
  {
    label: "LineDraw639",
    equation: "X96384476Y-151379901D01"
  },
  {
    label: "LineDraw640",
    equation: "X96372856Y-151377495D01"
  },
  {
    label: "LineDraw641",
    equation: "X96337711Y-151368472D01"
  },
  {
    label: "LineDraw642",
    equation: "X96337710Y-151368472D01"
  },
  {
    label: "LineDraw643",
    equation: "X96330030Y-151366500D01"
  },
  {
    label: "LineDraw644",
    equation: "X96309776Y-151366500D01"
  },
  {
    label: "LineDraw645",
    equation: "X96290065Y-151364949D01"
  },
  {
    label: "LineDraw646",
    equation: "X96277886Y-151363020D01"
  },
  {
    label: "LineDraw647",
    equation: "X96270057Y-151361780D01"
  },
  {
    label: "LineDraw648",
    equation: "X96240786Y-151364547D01"
  },
  {
    label: "LineDraw649",
    equation: "X96226039Y-151365941D01"
  },
  {
    label: "LineDraw650",
    equation: "X96214181Y-151366500D01"
  },
  {
    label: "LineDraw651",
    equation: "X77198767Y-151366500D01"
  },
  {
    label: "LineDraw652",
    equation: "X77187584Y-151365973D01"
  },
  {
    label: "LineDraw653",
    equation: "X77180091Y-151364298D01"
  },
  {
    label: "LineDraw654",
    equation: "X77172165Y-151364547D01"
  },
  {
    label: "LineDraw655",
    equation: "X77172164Y-151364547D01"
  },
  {
    label: "LineDraw656",
    equation: "X77112014Y-151366438D01"
  },
  {
    label: "LineDraw657",
    equation: "X77108055Y-151366500D01"
  },
  {
    label: "LineDraw658",
    equation: "X77080144Y-151366500D01"
  },
  {
    label: "LineDraw659",
    equation: "X77076210Y-151366997D01"
  },
  {
    label: "LineDraw660",
    equation: "X77076209Y-151366997D01"
  },
  {
    label: "LineDraw661",
    equation: "X77076144Y-151367005D01"
  },
  {
    label: "LineDraw662",
    equation: "X77064307Y-151367938D01"
  },
  {
    label: "LineDraw663",
    equation: "X77032490Y-151368938D01"
  },
  {
    label: "LineDraw664",
    equation: "X77028029Y-151369078D01"
  },
  {
    label: "LineDraw665",
    equation: "X77020110Y-151369327D01"
  },
  {
    label: "LineDraw666",
    equation: "X77002454Y-151374456D01"
  },
  {
    label: "LineDraw667",
    equation: "X77000658Y-151374978D01"
  },
  {
    label: "LineDraw668",
    equation: "X76981306Y-151378986D01"
  },
  {
    label: "LineDraw669",
    equation: "X76974235Y-151379880D01"
  },
  {
    label: "LineDraw670",
    equation: "X76961203Y-151381526D01"
  },
  {
    label: "LineDraw671",
    equation: "X76953834Y-151384443D01"
  },
  {
    label: "LineDraw672",
    equation: "X76953832Y-151384444D01"
  },
  {
    label: "LineDraw673",
    equation: "X76920097Y-151397800D01"
  },
  {
    label: "LineDraw674",
    equation: "X76908869Y-151401645D01"
  },
  {
    label: "LineDraw675",
    equation: "X76866407Y-151413982D01"
  },
  {
    label: "LineDraw676",
    equation: "X76859584Y-151418017D01"
  },
  {
    label: "LineDraw677",
    equation: "X76859582Y-151418018D01"
  },
  {
    label: "LineDraw678",
    equation: "X76848972Y-151424293D01"
  },
  {
    label: "LineDraw679",
    equation: "X76831224Y-151432988D01"
  },
  {
    label: "LineDraw680",
    equation: "X76812383Y-151440448D01"
  },
  {
    label: "LineDraw681",
    equation: "X76805967Y-151445110D01"
  },
  {
    label: "LineDraw682",
    equation: "X76805966Y-151445110D01"
  },
  {
    label: "LineDraw683",
    equation: "X76776613Y-151466436D01"
  },
  {
    label: "LineDraw684",
    equation: "X76766693Y-151472952D01"
  },
  {
    label: "LineDraw685",
    equation: "X76735465Y-151491420D01"
  },
  {
    label: "LineDraw686",
    equation: "X76735462Y-151491422D01"
  },
  {
    label: "LineDraw687",
    equation: "X76728638Y-151495458D01"
  },
  {
    label: "LineDraw688",
    equation: "X76714317Y-151509779D01"
  },
  {
    label: "LineDraw689",
    equation: "X76699284Y-151522619D01"
  },
  {
    label: "LineDraw690",
    equation: "X76682893Y-151534528D01"
  },
  {
    label: "LineDraw691",
    equation: "X76674217Y-151545016D01"
  },
  {
    label: "LineDraw692",
    equation: "X76654702Y-151568605D01"
  },
  {
    label: "LineDraw693",
    equation: "X76646712Y-151577384D01"
  },
  {
    label: "LineDraw694",
    equation: "X75577345Y-152646750D01"
  },
  {
    label: "LineDraw695",
    equation: "X75515033Y-152680776D01"
  },
  {
    label: "LineDraw696",
    equation: "X75466154Y-152681702D01"
  },
  {
    label: "LineDraw697",
    equation: "X75253373Y-152643800D01"
  },
  {
    label: "LineDraw698",
    equation: "X75253367Y-152643799D01"
  },
  {
    label: "LineDraw699",
    equation: "X75248284Y-152642894D01"
  },
  {
    label: "LineDraw700",
    equation: "X75174452Y-152641992D01"
  },
  {
    label: "LineDraw701",
    equation: "X75030081Y-152640228D01"
  },
  {
    label: "LineDraw702",
    equation: "X75030079Y-152640228D01"
  },
  {
    label: "LineDraw703",
    equation: "X75024911Y-152640165D01"
  },
  {
    label: "LineDraw704",
    equation: "X74804091Y-152673955D01"
  },
  {
    label: "LineDraw705",
    equation: "X74591756Y-152743357D01"
  },
  {
    label: "LineDraw706",
    equation: "X74393607Y-152846507D01"
  },
  {
    label: "LineDraw707",
    equation: "X74389474Y-152849610D01"
  },
  {
    label: "LineDraw708",
    equation: "X74389471Y-152849612D01"
  },
  {
    label: "LineDraw709",
    equation: "X74224750Y-152973288D01"
  },
  {
    label: "LineDraw710",
    equation: "X74214965Y-152980635D01"
  },
  {
    label: "LineDraw711",
    equation: "X74211393Y-152984373D01"
  },
  {
    label: "LineDraw712",
    equation: "X74103729Y-153097037D01"
  },
  {
    label: "LineDraw713",
    equation: "X74060629Y-153142138D01"
  },
  {
    label: "LineDraw714",
    equation: "X73953201Y-153299621D01"
  },
  {
    label: "LineDraw715",
    equation: "X73898293Y-153344621D01"
  },
  {
    label: "LineDraw716",
    equation: "X73827768Y-153352792D01"
  },
  {
    label: "LineDraw717",
    equation: "X73764021Y-153321538D01"
  },
  {
    label: "LineDraw718",
    equation: "X73743324Y-153297054D01"
  },
  {
    label: "LineDraw719",
    equation: "X73662822Y-153172617D01"
  },
  {
    label: "LineDraw720",
    equation: "X73662820Y-153172614D01"
  },
  {
    label: "LineDraw721",
    equation: "X73660014Y-153168277D01"
  },
  {
    label: "LineDraw722",
    equation: "X73509670Y-153003051D01"
  },
  {
    label: "LineDraw723",
    equation: "X73505619Y-152999852D01"
  },
  {
    label: "LineDraw724",
    equation: "X73505615Y-152999848D01"
  },
  {
    label: "LineDraw725",
    equation: "X73338414Y-152867800D01"
  },
  {
    label: "LineDraw726",
    equation: "X73338410Y-152867798D01"
  },
  {
    label: "LineDraw727",
    equation: "X73334359Y-152864598D01"
  },
  {
    label: "LineDraw728",
    equation: "X73313906Y-152853307D01"
  },
  {
    label: "LineDraw729",
    equation: "X73235619Y-152810091D01"
  },
  {
    label: "LineDraw730",
    equation: "X73138789Y-152756638D01"
  },
  {
    label: "LineDraw731",
    equation: "X73133920Y-152754914D01"
  },
  {
    label: "LineDraw732",
    equation: "X73133916Y-152754912D01"
  },
  {
    label: "LineDraw733",
    equation: "X72933087Y-152683795D01"
  },
  {
    label: "LineDraw734",
    equation: "X72933083Y-152683794D01"
  },
  {
    label: "LineDraw735",
    equation: "X72928212Y-152682069D01"
  },
  {
    label: "LineDraw736",
    equation: "X72923119Y-152681162D01"
  },
  {
    label: "LineDraw737",
    equation: "X72923116Y-152681161D01"
  },
  {
    label: "LineDraw738",
    equation: "X72713373Y-152643800D01"
  },
  {
    label: "LineDraw739",
    equation: "X72713367Y-152643799D01"
  },
  {
    label: "LineDraw740",
    equation: "X72708284Y-152642894D01"
  },
  {
    label: "LineDraw741",
    equation: "X72634452Y-152641992D01"
  },
  {
    label: "LineDraw742",
    equation: "X72490081Y-152640228D01"
  },
  {
    label: "LineDraw743",
    equation: "X72490079Y-152640228D01"
  },
  {
    label: "LineDraw744",
    equation: "X72484911Y-152640165D01"
  },
  {
    label: "LineDraw745",
    equation: "X72264091Y-152673955D01"
  },
  {
    label: "LineDraw746",
    equation: "X72051756Y-152743357D01"
  },
  {
    label: "LineDraw747",
    equation: "X71853607Y-152846507D01"
  },
  {
    label: "LineDraw748",
    equation: "X71849474Y-152849610D01"
  },
  {
    label: "LineDraw749",
    equation: "X71849471Y-152849612D01"
  },
  {
    label: "LineDraw750",
    equation: "X71684750Y-152973288D01"
  },
  {
    label: "LineDraw751",
    equation: "X71674965Y-152980635D01"
  },
  {
    label: "LineDraw752",
    equation: "X71671393Y-152984373D01"
  },
  {
    label: "LineDraw753",
    equation: "X71563729Y-153097037D01"
  },
  {
    label: "LineDraw754",
    equation: "X71520629Y-153142138D01"
  },
  {
    label: "LineDraw755",
    equation: "X71413201Y-153299621D01"
  },
  {
    label: "LineDraw756",
    equation: "X71358293Y-153344621D01"
  },
  {
    label: "LineDraw757",
    equation: "X71287768Y-153352792D01"
  },
  {
    label: "LineDraw758",
    equation: "X71224021Y-153321538D01"
  },
  {
    label: "LineDraw759",
    equation: "X71203324Y-153297054D01"
  },
  {
    label: "LineDraw760",
    equation: "X71122822Y-153172617D01"
  },
  {
    label: "LineDraw761",
    equation: "X71122820Y-153172614D01"
  },
  {
    label: "LineDraw762",
    equation: "X71120014Y-153168277D01"
  },
  {
    label: "LineDraw763",
    equation: "X70969670Y-153003051D01"
  },
  {
    label: "LineDraw764",
    equation: "X70965619Y-152999852D01"
  },
  {
    label: "LineDraw765",
    equation: "X70965615Y-152999848D01"
  },
  {
    label: "LineDraw766",
    equation: "X70798414Y-152867800D01"
  },
  {
    label: "LineDraw767",
    equation: "X70798410Y-152867798D01"
  },
  {
    label: "LineDraw768",
    equation: "X70794359Y-152864598D01"
  },
  {
    label: "LineDraw769",
    equation: "X70773906Y-152853307D01"
  },
  {
    label: "LineDraw770",
    equation: "X70695619Y-152810091D01"
  },
  {
    label: "LineDraw771",
    equation: "X70598789Y-152756638D01"
  },
  {
    label: "LineDraw772",
    equation: "X70593920Y-152754914D01"
  },
  {
    label: "LineDraw773",
    equation: "X70593916Y-152754912D01"
  },
  {
    label: "LineDraw774",
    equation: "X70393087Y-152683795D01"
  },
  {
    label: "LineDraw775",
    equation: "X70393083Y-152683794D01"
  },
  {
    label: "LineDraw776",
    equation: "X70388212Y-152682069D01"
  },
  {
    label: "LineDraw777",
    equation: "X70383119Y-152681162D01"
  },
  {
    label: "LineDraw778",
    equation: "X70383116Y-152681161D01"
  },
  {
    label: "LineDraw779",
    equation: "X70173373Y-152643800D01"
  },
  {
    label: "LineDraw780",
    equation: "X70173367Y-152643799D01"
  },
  {
    label: "LineDraw781",
    equation: "X70168284Y-152642894D01"
  },
  {
    label: "LineDraw782",
    equation: "X70094452Y-152641992D01"
  },
  {
    label: "LineDraw783",
    equation: "X69950081Y-152640228D01"
  },
  {
    label: "LineDraw784",
    equation: "X69950079Y-152640228D01"
  },
  {
    label: "LineDraw785",
    equation: "X69944911Y-152640165D01"
  },
  {
    label: "LineDraw786",
    equation: "X69724091Y-152673955D01"
  },
  {
    label: "LineDraw787",
    equation: "X69511756Y-152743357D01"
  },
  {
    label: "LineDraw788",
    equation: "X69313607Y-152846507D01"
  },
  {
    label: "LineDraw789",
    equation: "X69309474Y-152849610D01"
  },
  {
    label: "LineDraw790",
    equation: "X69309471Y-152849612D01"
  },
  {
    label: "LineDraw791",
    equation: "X69144750Y-152973288D01"
  },
  {
    label: "LineDraw792",
    equation: "X69134965Y-152980635D01"
  },
  {
    label: "LineDraw793",
    equation: "X69078537Y-153039684D01"
  },
  {
    label: "LineDraw794",
    equation: "X69054283Y-153065064D01"
  },
  {
    label: "LineDraw795",
    equation: "X68992759Y-153100494D01"
  },
  {
    label: "LineDraw796",
    equation: "X68921846Y-153097037D01"
  },
  {
    label: "LineDraw797",
    equation: "X68864060Y-153055791D01"
  },
  {
    label: "LineDraw798",
    equation: "X68845207Y-153022243D01"
  },
  {
    label: "LineDraw799",
    equation: "X68803767Y-152911703D01"
  },
  {
    label: "LineDraw800",
    equation: "X68800615Y-152903295D01"
  },
  {
    label: "LineDraw801",
    equation: "X68713261Y-152786739D01"
  },
  {
    label: "LineDraw802",
    equation: "X68596705Y-152699385D01"
  },
  {
    label: "LineDraw803",
    equation: "X68460316Y-152648255D01"
  },
  {
    label: "LineDraw804",
    equation: "X68398134Y-152641500D01"
  },
  {
    label: "LineDraw805",
    equation: "X66601866Y-152641500D01"
  },
  {
    label: "LineDraw806",
    equation: "X66539684Y-152648255D01"
  },
  {
    label: "LineDraw807",
    equation: "X66403295Y-152699385D01"
  },
  {
    label: "LineDraw808",
    equation: "X66286739Y-152786739D01"
  },
  {
    label: "LineDraw809",
    equation: "X66199385Y-152903295D01"
  },
  {
    label: "LineDraw810",
    equation: "X66148255Y-153039684D01"
  },
  {
    label: "LineDraw811",
    equation: "X66141500Y-153101866D01"
  },
  {
    label: "LineDraw812",
    equation: "X66141500Y-154898134D01"
  },
  {
    label: "LineDraw813",
    equation: "X66148255Y-154960316D01"
  },
  {
    label: "LineDraw814",
    equation: "X66199385Y-155096705D01"
  },
  {
    label: "LineDraw815",
    equation: "X66286739Y-155213261D01"
  },
  {
    label: "LineDraw816",
    equation: "X66403295Y-155300615D01"
  },
  {
    label: "LineDraw817",
    equation: "X66411704Y-155303767D01"
  },
  {
    label: "LineDraw818",
    equation: "X66411705Y-155303768D01"
  },
  {
    label: "LineDraw819",
    equation: "X66520451Y-155344535D01"
  },
  {
    label: "LineDraw820",
    equation: "X66577216Y-155387176D01"
  },
  {
    label: "LineDraw821",
    equation: "X66601916Y-155453738D01"
  },
  {
    label: "LineDraw822",
    equation: "X66586709Y-155523087D01"
  },
  {
    label: "LineDraw823",
    equation: "X66567316Y-155549568D01"
  },
  {
    label: "LineDraw824",
    equation: "X66510884Y-155608621D01"
  },
  {
    label: "LineDraw825",
    equation: "X66440629Y-155682138D01"
  },
  {
    label: "LineDraw826",
    equation: "X66314743Y-155866680D01"
  },
  {
    label: "LineDraw827",
    equation: "X66220688Y-156069305D01"
  },
  {
    label: "LineDraw828",
    equation: "X66160989Y-156284570D01"
  },
  {
    label: "LineDraw829",
    equation: "X66137251Y-156506695D01"
  },
  {
    label: "LineDraw830",
    equation: "X66137548Y-156511848D01"
  },
  {
    label: "LineDraw831",
    equation: "X66137548Y-156511851D01"
  },
  {
    label: "LineDraw832",
    equation: "X66147816Y-156689928D01"
  },
  {
    label: "LineDraw833",
    equation: "X66150110Y-156729715D01"
  },
  {
    label: "LineDraw834",
    equation: "X66151247Y-156734761D01"
  },
  {
    label: "LineDraw835",
    equation: "X66151248Y-156734767D01"
  },
  {
    label: "LineDraw836",
    equation: "X66154681Y-156750000D01"
  },
  {
    label: "LineDraw837",
    equation: "X66199222Y-156947639D01"
  },
  {
    label: "LineDraw838",
    equation: "X66249878Y-157072390D01"
  },
  {
    label: "LineDraw839",
    equation: "X66275322Y-157135051D01"
  },
  {
    label: "LineDraw840",
    equation: "X66283266Y-157154616D01"
  },
  {
    label: "LineDraw841",
    equation: "X66334019Y-157237438D01"
  },
  {
    label: "LineDraw842",
    equation: "X66397291Y-157340688D01"
  },
  {
    label: "LineDraw843",
    equation: "X66399987Y-157345088D01"
  },
  {
    label: "LineDraw844",
    equation: "X66546250Y-157513938D01"
  },
  {
    label: "LineDraw845",
    equation: "X66718126Y-157656632D01"
  },
  {
    label: "LineDraw846",
    equation: "X66911000Y-157769338D01"
  },
  {
    label: "LineDraw847",
    equation: "X67119692Y-157849030D01"
  },
  {
    label: "LineDraw848",
    equation: "X67124760Y-157850061D01"
  },
  {
    label: "LineDraw849",
    equation: "X67124763Y-157850062D01"
  },
  {
    label: "LineDraw850",
    equation: "X67232012Y-157871882D01"
  },
  {
    label: "LineDraw851",
    equation: "X67338597Y-157893567D01"
  },
  {
    label: "LineDraw852",
    equation: "X67343772Y-157893757D01"
  },
  {
    label: "LineDraw853",
    equation: "X67343774Y-157893757D01"
  },
  {
    label: "LineDraw854",
    equation: "X67556673Y-157901564D01"
  },
  {
    label: "LineDraw855",
    equation: "X67556677Y-157901564D01"
  },
  {
    label: "LineDraw856",
    equation: "X67561837Y-157901753D01"
  },
  {
    label: "LineDraw857",
    equation: "X67566957Y-157901097D01"
  },
  {
    label: "LineDraw858",
    equation: "X67566959Y-157901097D01"
  },
  {
    label: "LineDraw859",
    equation: "X67778288Y-157874025D01"
  },
  {
    label: "LineDraw860",
    equation: "X67778289Y-157874025D01"
  },
  {
    label: "LineDraw861",
    equation: "X67783416Y-157873368D01"
  },
  {
    label: "LineDraw862",
    equation: "X67829827Y-157859444D01"
  },
  {
    label: "LineDraw863",
    equation: "X67992429Y-157810661D01"
  },
  {
    label: "LineDraw864",
    equation: "X67992434Y-157810659D01"
  },
  {
    label: "LineDraw865",
    equation: "X67997384Y-157809174D01"
  },
  {
    label: "LineDraw866",
    equation: "X68197994Y-157710896D01"
  },
  {
    label: "LineDraw867",
    equation: "X68379860Y-157581173D01"
  },
  {
    label: "LineDraw868",
    equation: "X68395451Y-157565637D01"
  },
  {
    label: "LineDraw869",
    equation: "X68512202Y-157449293D01"
  },
  {
    label: "LineDraw870",
    equation: "X68538096Y-157423489D01"
  },
  {
    label: "LineDraw871",
    equation: "X68557462Y-157396539D01"
  },
  {
    label: "LineDraw872",
    equation: "X68668453Y-157242077D01"
  },
  {
    label: "LineDraw873",
    equation: "X68669776Y-157243028D01"
  },
  {
    label: "LineDraw874",
    equation: "X68716645Y-157199857D01"
  },
  {
    label: "LineDraw875",
    equation: "X68786580Y-157187625D01"
  },
  {
    label: "LineDraw876",
    equation: "X68852026Y-157215144D01"
  },
  {
    label: "LineDraw877",
    equation: "X68879875Y-157246994D01"
  },
  {
    label: "LineDraw878",
    equation: "X68939987Y-157345088D01"
  },
  {
    label: "LineDraw879",
    equation: "X69086250Y-157513938D01"
  },
  {
    label: "LineDraw880",
    equation: "X69258126Y-157656632D01"
  },
  {
    label: "LineDraw881",
    equation: "X69451000Y-157769338D01"
  },
  {
    label: "LineDraw882",
    equation: "X69659692Y-157849030D01"
  },
  {
    label: "LineDraw883",
    equation: "X69664760Y-157850061D01"
  },
  {
    label: "LineDraw884",
    equation: "X69664763Y-157850062D01"
  },
  {
    label: "LineDraw885",
    equation: "X69772012Y-157871882D01"
  },
  {
    label: "LineDraw886",
    equation: "X69878597Y-157893567D01"
  },
  {
    label: "LineDraw887",
    equation: "X69883772Y-157893757D01"
  },
  {
    label: "LineDraw888",
    equation: "X69883774Y-157893757D01"
  },
  {
    label: "LineDraw889",
    equation: "X70096673Y-157901564D01"
  },
  {
    label: "LineDraw890",
    equation: "X70096677Y-157901564D01"
  },
  {
    label: "LineDraw891",
    equation: "X70101837Y-157901753D01"
  },
  {
    label: "LineDraw892",
    equation: "X70106957Y-157901097D01"
  },
  {
    label: "LineDraw893",
    equation: "X70106959Y-157901097D01"
  },
  {
    label: "LineDraw894",
    equation: "X70318288Y-157874025D01"
  },
  {
    label: "LineDraw895",
    equation: "X70318289Y-157874025D01"
  },
  {
    label: "LineDraw896",
    equation: "X70323416Y-157873368D01"
  },
  {
    label: "LineDraw897",
    equation: "X70369827Y-157859444D01"
  },
  {
    label: "LineDraw898",
    equation: "X70532429Y-157810661D01"
  },
  {
    label: "LineDraw899",
    equation: "X70532434Y-157810659D01"
  },
  {
    label: "LineDraw900",
    equation: "X70537384Y-157809174D01"
  },
  {
    label: "LineDraw901",
    equation: "X70737994Y-157710896D01"
  },
  {
    label: "LineDraw902",
    equation: "X70919860Y-157581173D01"
  },
  {
    label: "LineDraw903",
    equation: "X70935451Y-157565637D01"
  },
  {
    label: "LineDraw904",
    equation: "X71052202Y-157449293D01"
  },
  {
    label: "LineDraw905",
    equation: "X71078096Y-157423489D01"
  },
  {
    label: "LineDraw906",
    equation: "X71097462Y-157396539D01"
  },
  {
    label: "LineDraw907",
    equation: "X71208453Y-157242077D01"
  },
  {
    label: "LineDraw908",
    equation: "X71209776Y-157243028D01"
  },
  {
    label: "LineDraw909",
    equation: "X71256645Y-157199857D01"
  },
  {
    label: "LineDraw910",
    equation: "X71326580Y-157187625D01"
  },
  {
    label: "LineDraw911",
    equation: "X71392026Y-157215144D01"
  },
  {
    label: "LineDraw912",
    equation: "X71419875Y-157246994D01"
  },
  {
    label: "LineDraw913",
    equation: "X71479987Y-157345088D01"
  },
  {
    label: "LineDraw914",
    equation: "X71626250Y-157513938D01"
  },
  {
    label: "LineDraw915",
    equation: "X71798126Y-157656632D01"
  },
  {
    label: "LineDraw916",
    equation: "X71991000Y-157769338D01"
  },
  {
    label: "LineDraw917",
    equation: "X72199692Y-157849030D01"
  },
  {
    label: "LineDraw918",
    equation: "X72204760Y-157850061D01"
  },
  {
    label: "LineDraw919",
    equation: "X72204763Y-157850062D01"
  },
  {
    label: "LineDraw920",
    equation: "X72312012Y-157871882D01"
  },
  {
    label: "LineDraw921",
    equation: "X72418597Y-157893567D01"
  },
  {
    label: "LineDraw922",
    equation: "X72423772Y-157893757D01"
  },
  {
    label: "LineDraw923",
    equation: "X72423774Y-157893757D01"
  },
  {
    label: "LineDraw924",
    equation: "X72636673Y-157901564D01"
  },
  {
    label: "LineDraw925",
    equation: "X72636677Y-157901564D01"
  },
  {
    label: "LineDraw926",
    equation: "X72641837Y-157901753D01"
  },
  {
    label: "LineDraw927",
    equation: "X72646957Y-157901097D01"
  },
  {
    label: "LineDraw928",
    equation: "X72646959Y-157901097D01"
  },
  {
    label: "LineDraw929",
    equation: "X72858288Y-157874025D01"
  },
  {
    label: "LineDraw930",
    equation: "X72858289Y-157874025D01"
  },
  {
    label: "LineDraw931",
    equation: "X72863416Y-157873368D01"
  },
  {
    label: "LineDraw932",
    equation: "X72868367Y-157871883D01"
  },
  {
    label: "LineDraw933",
    equation: "X72868370Y-157871882D01"
  },
  {
    label: "LineDraw934",
    equation: "X72909829Y-157859444D01"
  },
  {
    label: "LineDraw935",
    equation: "X72980825Y-157859028D01"
  },
  {
    label: "LineDraw936",
    equation: "X73035131Y-157891035D01"
  },
  {
    label: "LineDraw937",
    equation: "X74351000Y-159206905D01"
  },
  {
    label: "LineDraw938",
    equation: "X74385026Y-159269217D01"
  },
  {
    label: "LineDraw939",
    equation: "X74379961Y-159340033D01"
  },
  {
    label: "LineDraw940",
    equation: "X74337414Y-159396868D01"
  },
  {
    label: "LineDraw941",
    equation: "X74270894Y-159421679D01"
  },
  {
    label: "LineDraw942",
    equation: "X74261905Y-159422000D01"
  },
  {
    label: "LineDraw943",
    equation: "X40812000Y-159422000D01"
  },
  {
    label: "LineDraw944",
    equation: "X40743879Y-159401998D01"
  },
  {
    label: "LineDraw945",
    equation: "X40697386Y-159348342D01"
  },
  {
    label: "LineDraw946",
    equation: "X40686000Y-159296000D01"
  },
  {
    label: "LineDraw947",
    equation: "X40686000Y-149479943D01"
  },
  {
    label: "LineDraw948",
    equation: "X43111780Y-149479943D01"
  },
  {
    label: "LineDraw949",
    equation: "X43112526Y-149487835D01"
  },
  {
    label: "LineDraw950",
    equation: "X43115941Y-149523961D01"
  },
  {
    label: "LineDraw951",
    equation: "X43116500Y-149535819D01"
  },
  {
    label: "LineDraw952",
    equation: "X43116500Y-152421233D01"
  },
  {
    label: "LineDraw953",
    equation: "X43115973Y-152432416D01"
  },
  {
    label: "LineDraw954",
    equation: "X43114298Y-152439909D01"
  },
  {
    label: "LineDraw955",
    equation: "X43114547Y-152447835D01"
  },
  {
    label: "LineDraw956",
    equation: "X43114547Y-152447836D01"
  },
  {
    label: "LineDraw957",
    equation: "X43116438Y-152507986D01"
  },
  {
    label: "LineDraw958",
    equation: "X43116500Y-152511945D01"
  },
  {
    label: "LineDraw959",
    equation: "X43116500Y-152539856D01"
  },
  {
    label: "LineDraw960",
    equation: "X43116997Y-152543790D01"
  },
  {
    label: "LineDraw961",
    equation: "X43116997Y-152543791D01"
  },
  {
    label: "LineDraw962",
    equation: "X43117005Y-152543856D01"
  },
  {
    label: "LineDraw963",
    equation: "X43117938Y-152555693D01"
  },
  {
    label: "LineDraw964",
    equation: "X43119327Y-152599889D01"
  },
  {
    label: "LineDraw965",
    equation: "X43124978Y-152619339D01"
  },
  {
    label: "LineDraw966",
    equation: "X43128987Y-152638700D01"
  },
  {
    label: "LineDraw967",
    equation: "X43131526Y-152658797D01"
  },
  {
    label: "LineDraw968",
    equation: "X43134445Y-152666168D01"
  },
  {
    label: "LineDraw969",
    equation: "X43134445Y-152666170D01"
  },
  {
    label: "LineDraw970",
    equation: "X43147804Y-152699912D01"
  },
  {
    label: "LineDraw971",
    equation: "X43151649Y-152711142D01"
  },
  {
    label: "LineDraw972",
    equation: "X43161771Y-152745983D01"
  },
  {
    label: "LineDraw973",
    equation: "X43163982Y-152753593D01"
  },
  {
    label: "LineDraw974",
    equation: "X43168015Y-152760412D01"
  },
  {
    label: "LineDraw975",
    equation: "X43168017Y-152760417D01"
  },
  {
    label: "LineDraw976",
    equation: "X43174293Y-152771028D01"
  },
  {
    label: "LineDraw977",
    equation: "X43182988Y-152788776D01"
  },
  {
    label: "LineDraw978",
    equation: "X43190448Y-152807617D01"
  },
  {
    label: "LineDraw979",
    equation: "X43195110Y-152814033D01"
  },
  {
    label: "LineDraw980",
    equation: "X43195110Y-152814034D01"
  },
  {
    label: "LineDraw981",
    equation: "X43216436Y-152843387D01"
  },
  {
    label: "LineDraw982",
    equation: "X43222952Y-152853307D01"
  },
  {
    label: "LineDraw983",
    equation: "X43229630Y-152864598D01"
  },
  {
    label: "LineDraw984",
    equation: "X43245458Y-152891362D01"
  },
  {
    label: "LineDraw985",
    equation: "X43259779Y-152905683D01"
  },
  {
    label: "LineDraw986",
    equation: "X43272619Y-152920716D01"
  },
  {
    label: "LineDraw987",
    equation: "X43284528Y-152937107D01"
  },
  {
    label: "LineDraw988",
    equation: "X43290634Y-152942158D01"
  },
  {
    label: "LineDraw989",
    equation: "X43318605Y-152965298D01"
  },
  {
    label: "LineDraw990",
    equation: "X43327384Y-152973288D01"
  },
  {
    label: "LineDraw991",
    equation: "X47246343Y-156892247D01"
  },
  {
    label: "LineDraw992",
    equation: "X47253887Y-156900537D01"
  },
  {
    label: "LineDraw993",
    equation: "X47258000Y-156907018D01"
  },
  {
    label: "LineDraw994",
    equation: "X47263777Y-156912443D01"
  },
  {
    label: "LineDraw995",
    equation: "X47307667Y-156953658D01"
  },
  {
    label: "LineDraw996",
    equation: "X47310509Y-156956413D01"
  },
  {
    label: "LineDraw997",
    equation: "X47330230Y-156976134D01"
  },
  {
    label: "LineDraw998",
    equation: "X47333425Y-156978612D01"
  },
  {
    label: "LineDraw999",
    equation: "X47342447Y-156986318D01"
  },
  {
    label: "LineDraw1000",
    equation: "X47374679Y-157016586D01"
  },
  {
    label: "LineDraw1001",
    equation: "X47381628Y-157020406D01"
  },
  {
    label: "LineDraw1002",
    equation: "X47392432Y-157026346D01"
  },
  {
    label: "LineDraw1003",
    equation: "X47408956Y-157037199D01"
  },
  {
    label: "LineDraw1004",
    equation: "X47424959Y-157049613D01"
  },
  {
    label: "LineDraw1005",
    equation: "X47465543Y-157067176D01"
  },
  {
    label: "LineDraw1006",
    equation: "X47476173Y-157072383D01"
  },
  {
    label: "LineDraw1007",
    equation: "X47514940Y-157093695D01"
  },
  {
    label: "LineDraw1008",
    equation: "X47522617Y-157095666D01"
  },
  {
    label: "LineDraw1009",
    equation: "X47522622Y-157095668D01"
  },
  {
    label: "LineDraw1010",
    equation: "X47534558Y-157098732D01"
  },
  {
    label: "LineDraw1011",
    equation: "X47553266Y-157105137D01"
  },
  {
    label: "LineDraw1012",
    equation: "X47571855Y-157113181D01"
  },
  {
    label: "LineDraw1013",
    equation: "X47579683Y-157114421D01"
  },
  {
    label: "LineDraw1014",
    equation: "X47579690Y-157114423D01"
  },
  {
    label: "LineDraw1015",
    equation: "X47615524Y-157120099D01"
  },
  {
    label: "LineDraw1016",
    equation: "X47627144Y-157122505D01"
  },
  {
    label: "LineDraw1017",
    equation: "X47662289Y-157131528D01"
  },
  {
    label: "LineDraw1018",
    equation: "X47669970Y-157133500D01"
  },
  {
    label: "LineDraw1019",
    equation: "X47690224Y-157133500D01"
  },
  {
    label: "LineDraw1020",
    equation: "X47709934Y-157135051D01"
  },
  {
    label: "LineDraw1021",
    equation: "X47729943Y-157138220D01"
  },
  {
    label: "LineDraw1022",
    equation: "X47737835Y-157137474D01"
  },
  {
    label: "LineDraw1023",
    equation: "X47773961Y-157134059D01"
  },
  {
    label: "LineDraw1024",
    equation: "X47785819Y-157133500D01"
  },
  {
    label: "LineDraw1025",
    equation: "X51791800Y-157133500D01"
  },
  {
    label: "LineDraw1026",
    equation: "X51859921Y-157153502D01"
  },
  {
    label: "LineDraw1027",
    equation: "X51879147Y-157169843D01"
  },
  {
    label: "LineDraw1028",
    equation: "X51879420Y-157169540D01"
  },
  {
    label: "LineDraw1029",
    equation: "X51884332Y-157173963D01"
  },
  {
    label: "LineDraw1030",
    equation: "X51888747Y-157178866D01"
  },
  {
    label: "LineDraw1031",
    equation: "X52043248Y-157291118D01"
  },
  {
    label: "LineDraw1032",
    equation: "X52049276Y-157293802D01"
  },
  {
    label: "LineDraw1033",
    equation: "X52049278Y-157293803D01"
  },
  {
    label: "LineDraw1034",
    equation: "X52211681Y-157366109D01"
  },
  {
    label: "LineDraw1035",
    equation: "X52217712Y-157368794D01"
  },
  {
    label: "LineDraw1036",
    equation: "X52310990Y-157388621D01"
  },
  {
    label: "LineDraw1037",
    equation: "X52398056Y-157407128D01"
  },
  {
    label: "LineDraw1038",
    equation: "X52398061Y-157407128D01"
  },
  {
    label: "LineDraw1039",
    equation: "X52404513Y-157408500D01"
  },
  {
    label: "LineDraw1040",
    equation: "X52595487Y-157408500D01"
  },
  {
    label: "LineDraw1041",
    equation: "X52601939Y-157407128D01"
  },
  {
    label: "LineDraw1042",
    equation: "X52601944Y-157407128D01"
  },
  {
    label: "LineDraw1043",
    equation: "X52689010Y-157388621D01"
  },
  {
    label: "LineDraw1044",
    equation: "X52782288Y-157368794D01"
  },
  {
    label: "LineDraw1045",
    equation: "X52788319Y-157366109D01"
  },
  {
    label: "LineDraw1046",
    equation: "X52950722Y-157293803D01"
  },
  {
    label: "LineDraw1047",
    equation: "X52950724Y-157293802D01"
  },
  {
    label: "LineDraw1048",
    equation: "X52956752Y-157291118D01"
  },
  {
    label: "LineDraw1049",
    equation: "X53111253Y-157178866D01"
  },
  {
    label: "LineDraw1050",
    equation: "X53128600Y-157159600D01"
  },
  {
    label: "LineDraw1051",
    equation: "X53234621Y-157041852D01"
  },
  {
    label: "LineDraw1052",
    equation: "X53234622Y-157041851D01"
  },
  {
    label: "LineDraw1053",
    equation: "X53239040Y-157036944D01"
  },
  {
    label: "LineDraw1054",
    equation: "X53314053Y-156907018D01"
  },
  {
    label: "LineDraw1055",
    equation: "X53331223Y-156877279D01"
  },
  {
    label: "LineDraw1056",
    equation: "X53331224Y-156877278D01"
  },
  {
    label: "LineDraw1057",
    equation: "X53334527Y-156871556D01"
  },
  {
    label: "LineDraw1058",
    equation: "X53393542Y-156689928D01"
  },
  {
    label: "LineDraw1059",
    equation: "X53413504Y-156500000D01"
  },
  {
    label: "LineDraw1060",
    equation: "X53396730Y-156340400D01"
  },
  {
    label: "LineDraw1061",
    equation: "X53394232Y-156316635D01"
  },
  {
    label: "LineDraw1062",
    equation: "X53394232Y-156316633D01"
  },
  {
    label: "LineDraw1063",
    equation: "X53393542Y-156310072D01"
  },
  {
    label: "LineDraw1064",
    equation: "X53334527Y-156128444D01"
  },
  {
    label: "LineDraw1065",
    equation: "X53239040Y-155963056D01"
  },
  {
    label: "LineDraw1066",
    equation: "X53182796Y-155900590D01"
  },
  {
    label: "LineDraw1067",
    equation: "X53115675Y-155826045D01"
  },
  {
    label: "LineDraw1068",
    equation: "X53115674Y-155826044D01"
  },
  {
    label: "LineDraw1069",
    equation: "X53111253Y-155821134D01"
  },
  {
    label: "LineDraw1070",
    equation: "X52956752Y-155708882D01"
  },
  {
    label: "LineDraw1071",
    equation: "X52950724Y-155706198D01"
  },
  {
    label: "LineDraw1072",
    equation: "X52950722Y-155706197D01"
  },
  {
    label: "LineDraw1073",
    equation: "X52788319Y-155633891D01"
  },
  {
    label: "LineDraw1074",
    equation: "X52788318Y-155633891D01"
  },
  {
    label: "LineDraw1075",
    equation: "X52782288Y-155631206D01"
  },
  {
    label: "LineDraw1076",
    equation: "X52676035Y-155608621D01"
  },
  {
    label: "LineDraw1077",
    equation: "X52601944Y-155592872D01"
  },
  {
    label: "LineDraw1078",
    equation: "X52601939Y-155592872D01"
  },
  {
    label: "LineDraw1079",
    equation: "X52595487Y-155591500D01"
  },
  {
    label: "LineDraw1080",
    equation: "X52404513Y-155591500D01"
  },
  {
    label: "LineDraw1081",
    equation: "X52398061Y-155592872D01"
  },
  {
    label: "LineDraw1082",
    equation: "X52398056Y-155592872D01"
  },
  {
    label: "LineDraw1083",
    equation: "X52323965Y-155608621D01"
  },
  {
    label: "LineDraw1084",
    equation: "X52217712Y-155631206D01"
  },
  {
    label: "LineDraw1085",
    equation: "X52211682Y-155633891D01"
  },
  {
    label: "LineDraw1086",
    equation: "X52211681Y-155633891D01"
  },
  {
    label: "LineDraw1087",
    equation: "X52049278Y-155706197D01"
  },
  {
    label: "LineDraw1088",
    equation: "X52049276Y-155706198D01"
  },
  {
    label: "LineDraw1089",
    equation: "X52043248Y-155708882D01"
  },
  {
    label: "LineDraw1090",
    equation: "X51888747Y-155821134D01"
  },
  {
    label: "LineDraw1091",
    equation: "X51884332Y-155826037D01"
  },
  {
    label: "LineDraw1092",
    equation: "X51879420Y-155830460D01"
  },
  {
    label: "LineDraw1093",
    equation: "X51878295Y-155829211D01"
  },
  {
    label: "LineDraw1094",
    equation: "X51824986Y-155862051D01"
  },
  {
    label: "LineDraw1095",
    equation: "X51791800Y-155866500D01"
  },
  {
    label: "LineDraw1096",
    equation: "X48064595Y-155866500D01"
  },
  {
    label: "LineDraw1097",
    equation: "X47996474Y-155846498D01"
  },
  {
    label: "LineDraw1098",
    equation: "X47975500Y-155829595D01"
  },
  {
    label: "LineDraw1099",
    equation: "X44420405Y-152274500D01"
  },
  {
    label: "LineDraw1100",
    equation: "X44386379Y-152212188D01"
  },
  {
    label: "LineDraw1101",
    equation: "X44383500Y-152185405D01"
  },
  {
    label: "LineDraw1102",
    equation: "X44383500Y-149814594D01"
  },
  {
    label: "LineDraw1103",
    equation: "X44403502Y-149746473D01"
  },
  {
    label: "LineDraw1104",
    equation: "X44420405Y-149725499D01"
  },
  {
    label: "LineDraw1105",
    equation: "X46042806Y-148103099D01"
  },
  {
    label: "LineDraw1106",
    equation: "X47682253Y-146463652D01"
  },
  {
    label: "LineDraw1107",
    equation: "X47690539Y-146456112D01"
  },
  {
    label: "LineDraw1108",
    equation: "X47697018Y-146452000D01"
  },
  {
    label: "LineDraw1109",
    equation: "X47725834Y-146421314D01"
  },
  {
    label: "LineDraw1110",
    equation: "X47787047Y-146385349D01"
  },
  {
    label: "LineDraw1111",
    equation: "X47857986Y-146388186D01"
  },
  {
    label: "LineDraw1112",
    equation: "X47916131Y-146428927D01"
  },
  {
    label: "LineDraw1113",
    equation: "X47943019Y-146494635D01"
  },
  {
    label: "LineDraw1114",
    equation: "X47934714Y-146554256D01"
  },
  {
    label: "LineDraw1115",
    equation: "X47804919Y-146879590D01"
  },
  {
    label: "LineDraw1116",
    equation: "X47712299Y-147219317D01"
  },
  {
    label: "LineDraw1117",
    equation: "X47658732Y-147567345D01"
  },
  {
    label: "LineDraw1118",
    equation: "X47658592Y-147570908D01"
  },
  {
    label: "LineDraw1119",
    equation: "X47655217Y-147656804D01"
  },
  {
    label: "LineDraw1120",
    equation: "X47632556Y-147724087D01"
  },
  {
    label: "LineDraw1121",
    equation: "X47577116Y-147768437D01"
  },
  {
    label: "LineDraw1122",
    equation: "X47506500Y-147775774D01"
  },
  {
    label: "LineDraw1123",
    equation: "X47481096Y-147768266D01"
  },
  {
    label: "LineDraw1124",
    equation: "X47396901Y-147733391D01"
  },
  {
    label: "LineDraw1125",
    equation: "X47389272Y-147730231D01"
  },
  {
    label: "LineDraw1126",
    equation: "X47342603Y-147724087D01"
  },
  {
    label: "LineDraw1127",
    equation: "X47258188Y-147712974D01"
  },
  {
    label: "LineDraw1128",
    equation: "X47250000Y-147711896D01"
  },
  {
    label: "LineDraw1129",
    equation: "X47241812Y-147712974D01"
  },
  {
    label: "LineDraw1130",
    equation: "X47157398Y-147724087D01"
  },
  {
    label: "LineDraw1131",
    equation: "X47110728Y-147730231D01"
  },
  {
    label: "LineDraw1132",
    equation: "X46980948Y-147783988D01"
  },
  {
    label: "LineDraw1133",
    equation: "X46869503Y-147869503D01"
  },
  {
    label: "LineDraw1134",
    equation: "X46783988Y-147980948D01"
  },
  {
    label: "LineDraw1135",
    equation: "X46730231Y-148110728D01"
  },
  {
    label: "LineDraw1136",
    equation: "X46711896Y-148250000D01"
  },
  {
    label: "LineDraw1137",
    equation: "X46712443Y-148254156D01"
  },
  {
    label: "LineDraw1138",
    equation: "X46729274Y-148596761D01"
  },
  {
    label: "LineDraw1139",
    equation: "X46780216Y-148940183D01"
  },
  {
    label: "LineDraw1140",
    equation: "X46780967Y-148943182D01"
  },
  {
    label: "LineDraw1141",
    equation: "X46780968Y-148943186D01"
  },
  {
    label: "LineDraw1142",
    equation: "X46809640Y-149057651D01"
  },
  {
    label: "LineDraw1143",
    equation: "X46864574Y-149276958D01"
  },
  {
    label: "LineDraw1144",
    equation: "X46865611Y-149279855D01"
  },
  {
    label: "LineDraw1145",
    equation: "X46865613Y-149279863D01"
  },
  {
    label: "LineDraw1146",
    equation: "X46870731Y-149294166D01"
  },
  {
    label: "LineDraw1147",
    equation: "X46981535Y-149603843D01"
  },
  {
    label: "LineDraw1148",
    equation: "X47129973Y-149917689D01"
  },
  {
    label: "LineDraw1149",
    equation: "X47131556Y-149920330D01"
  },
  {
    label: "LineDraw1150",
    equation: "X47306870Y-150212825D01"
  },
  {
    label: "LineDraw1151",
    equation: "X47306876Y-150212834D01"
  },
  {
    label: "LineDraw1152",
    equation: "X47308459Y-150215475D01"
  },
  {
    label: "LineDraw1153",
    equation: "X47310302Y-150217960D01"
  },
  {
    label: "LineDraw1154",
    equation: "X47507765Y-150484207D01"
  },
  {
    label: "LineDraw1155",
    equation: "X47515274Y-150494332D01"
  },
  {
    label: "LineDraw1156",
    equation: "X47748425Y-150751575D01"
  },
  {
    label: "LineDraw1157",
    equation: "X48005668Y-150984726D01"
  },
  {
    label: "LineDraw1158",
    equation: "X48008154Y-150986570D01"
  },
  {
    label: "LineDraw1159",
    equation: "X48008158Y-150986573D01"
  },
  {
    label: "LineDraw1160",
    equation: "X48134170Y-151080030D01"
  },
  {
    label: "LineDraw1161",
    equation: "X48284525Y-151191541D01"
  },
  {
    label: "LineDraw1162",
    equation: "X48287166Y-151193124D01"
  },
  {
    label: "LineDraw1163",
    equation: "X48287175Y-151193130D01"
  },
  {
    label: "LineDraw1164",
    equation: "X48495117Y-151317765D01"
  },
  {
    label: "LineDraw1165",
    equation: "X48582311Y-151370027D01"
  },
  {
    label: "LineDraw1166",
    equation: "X48585090Y-151371341D01"
  },
  {
    label: "LineDraw1167",
    equation: "X48585093Y-151371343D01"
  },
  {
    label: "LineDraw1168",
    equation: "X48645660Y-151399989D01"
  },
  {
    label: "LineDraw1169",
    equation: "X48896157Y-151518465D01"
  },
  {
    label: "LineDraw1170",
    equation: "X49049056Y-151573173D01"
  },
  {
    label: "LineDraw1171",
    equation: "X49220137Y-151634387D01"
  },
  {
    label: "LineDraw1172",
    equation: "X49220145Y-151634389D01"
  },
  {
    label: "LineDraw1173",
    equation: "X49223042Y-151635426D01"
  },
  {
    label: "LineDraw1174",
    equation: "X49389908Y-151677224D01"
  },
  {
    label: "LineDraw1175",
    equation: "X49556814Y-151719032D01"
  },
  {
    label: "LineDraw1176",
    equation: "X49556818Y-151719033D01"
  },
  {
    label: "LineDraw1177",
    equation: "X49559817Y-151719784D01"
  },
  {
    label: "LineDraw1178",
    equation: "X49562879Y-151720238D01"
  },
  {
    label: "LineDraw1179",
    equation: "X49562883Y-151720239D01"
  },
  {
    label: "LineDraw1180",
    equation: "X49716805Y-151743071D01"
  },
  {
    label: "LineDraw1181",
    equation: "X49903239Y-151770726D01"
  },
  {
    label: "LineDraw1182",
    equation: "X49906323Y-151770878D01"
  },
  {
    label: "LineDraw1183",
    equation: "X49906328Y-151770878D01"
  },
  {
    label: "LineDraw1184",
    equation: "X50238732Y-151787208D01"
  },
  {
    label: "LineDraw1185",
    equation: "X50238734Y-151787208D01"
  },
  {
    label: "LineDraw1186",
    equation: "X50245844Y-151787557D01"
  },
  {
    label: "LineDraw1187",
    equation: "X50250000Y-151788104D01"
  },
  {
    label: "LineDraw1188",
    equation: "X50267486Y-151785802D01"
  },
  {
    label: "LineDraw1189",
    equation: "X50276785Y-151784578D01"
  },
  {
    label: "LineDraw1190",
    equation: "X50293230Y-151783500D01"
  },
  {
    label: "LineDraw1191",
    equation: "X74286617Y-151783500D01"
  },
  {
    label: "LineDraw1192",
    equation: "X74290864Y-151782918D01"
  },
  {
    label: "LineDraw1193",
    equation: "X74290867Y-151782918D01"
  },
  {
    label: "LineDraw1194",
    equation: "X74325159Y-151778220D01"
  },
  {
    label: "LineDraw1195",
    equation: "X74394818Y-151768678D01"
  },
  {
    label: "LineDraw1196",
    equation: "X74406755Y-151763512D01"
  },
  {
    label: "LineDraw1197",
    equation: "X74521085Y-151714038D01"
  },
  {
    label: "LineDraw1198",
    equation: "X74521088Y-151714036D01"
  },
  {
    label: "LineDraw1199",
    equation: "X74528966Y-151710627D01"
  },
  {
    label: "LineDraw1200",
    equation: "X74642561Y-151618640D01"
  },
  {
    label: "LineDraw1201",
    equation: "X74727235Y-151499492D01"
  },
  {
    label: "LineDraw1202",
    equation: "X74776748Y-151361964D01"
  },
  {
    label: "LineDraw1203",
    equation: "X74779000Y-151331306D01"
  },
  {
    label: "LineDraw1204",
    equation: "X74786824Y-151224750D01"
  },
  {
    label: "LineDraw1205",
    equation: "X74787453Y-151216186D01"
  },
  {
    label: "LineDraw1206",
    equation: "X74758562Y-151072900D01"
  },
  {
    label: "LineDraw1207",
    equation: "X74709209Y-150976039D01"
  },
  {
    label: "LineDraw1208",
    equation: "X74696101Y-150950313D01"
  },
  {
    label: "LineDraw1209",
    equation: "X74696099Y-150950310D01"
  },
  {
    label: "LineDraw1210",
    equation: "X74692202Y-150942662D01"
  },
  {
    label: "LineDraw1211",
    equation: "X74593263Y-150835066D01"
  },
  {
    label: "LineDraw1212",
    equation: "X74592956Y-150834876D01"
  },
  {
    label: "LineDraw1213",
    equation: "X74555439Y-150779326D01"
  },
  {
    label: "LineDraw1214",
    equation: "X74553820Y-150708348D01"
  },
  {
    label: "LineDraw1215",
    equation: "X74590831Y-150647762D01"
  },
  {
    label: "LineDraw1216",
    equation: "X74640235Y-150620113D01"
  },
  {
    label: "LineDraw1217",
    equation: "X74786659Y-150577434D01"
  },
  {
    label: "LineDraw1218",
    equation: "X75111390Y-150441263D01"
  },
  {
    label: "LineDraw1219",
    equation: "X75314556Y-150327485D01"
  },
  {
    label: "LineDraw1220",
    equation: "X75415502Y-150270953D01"
  },
  {
    label: "LineDraw1221",
    equation: "X75415507Y-150270950D01"
  },
  {
    label: "LineDraw1222",
    equation: "X75418619Y-150269207D01"
  },
  {
    label: "LineDraw1223",
    equation: "X75421515Y-150267122D01"
  },
  {
    label: "LineDraw1224",
    equation: "X75421520Y-150267119D01"
  },
  {
    label: "LineDraw1225",
    equation: "X75568239Y-150161496D01"
  },
  {
    label: "LineDraw1226",
    equation: "X75704395Y-150063477D01"
  },
  {
    label: "LineDraw1227",
    equation: "X75731301Y-150039038D01"
  },
  {
    label: "LineDraw1228",
    equation: "X75962405Y-149829118D01"
  },
  {
    label: "LineDraw1229",
    equation: "X75962406Y-149829117D01"
  },
  {
    label: "LineDraw1230",
    equation: "X75965046Y-149826719D01"
  },
  {
    label: "LineDraw1231",
    equation: "X76158055Y-149606635D01"
  },
  {
    label: "LineDraw1232",
    equation: "X76194868Y-149564658D01"
  },
  {
    label: "LineDraw1233",
    equation: "X76194869Y-149564656D01"
  },
  {
    label: "LineDraw1234",
    equation: "X76197219Y-149561977D01"
  },
  {
    label: "LineDraw1235",
    equation: "X76215366Y-149535819D01"
  },
  {
    label: "LineDraw1236",
    equation: "X76336652Y-149360984D01"
  },
  {
    label: "LineDraw1237",
    equation: "X76397929Y-149272653D01"
  },
  {
    label: "LineDraw1238",
    equation: "X76402074Y-149264940D01"
  },
  {
    label: "LineDraw1239",
    equation: "X76514009Y-149056618D01"
  },
  {
    label: "LineDraw1240",
    equation: "X76564598Y-148962468D01"
  },
  {
    label: "LineDraw1241",
    equation: "X76695081Y-148635410D01"
  },
  {
    label: "LineDraw1242",
    equation: "X76787701Y-148295683D01"
  },
  {
    label: "LineDraw1243",
    equation: "X76814908Y-148118916D01"
  },
  {
    label: "LineDraw1244",
    equation: "X76840726Y-147951178D01"
  },
  {
    label: "LineDraw1245",
    equation: "X76840726Y-147951174D01"
  },
  {
    label: "LineDraw1246",
    equation: "X76841268Y-147947655D01"
  },
  {
    label: "LineDraw1247",
    equation: "X76847698Y-147783988D01"
  },
  {
    label: "LineDraw1248",
    equation: "X76854952Y-147599370D01"
  },
  {
    label: "LineDraw1249",
    equation: "X76854952Y-147599365D01"
  },
  {
    label: "LineDraw1250",
    equation: "X76855092Y-147595800D01"
  },
  {
    label: "LineDraw1251",
    equation: "X76828996Y-147244642D01"
  },
  {
    label: "LineDraw1252",
    equation: "X76763316Y-146898696D01"
  },
  {
    label: "LineDraw1253",
    equation: "X76757384Y-146879590D01"
  },
  {
    label: "LineDraw1254",
    equation: "X76659955Y-146565820D01"
  },
  {
    label: "LineDraw1255",
    equation: "X76658896Y-146562408D01"
  },
  {
    label: "LineDraw1256",
    equation: "X76657455Y-146559133D01"
  },
  {
    label: "LineDraw1257",
    equation: "X76518522Y-146243382D01"
  },
  {
    label: "LineDraw1258",
    equation: "X76518520Y-146243379D01"
  },
  {
    label: "LineDraw1259",
    equation: "X76517079Y-146240103D01"
  },
  {
    label: "LineDraw1260",
    equation: "X76339687Y-145935924D01"
  },
  {
    label: "LineDraw1261",
    equation: "X76129001Y-145653781D01"
  },
  {
    label: "LineDraw1262",
    equation: "X76126557Y-145651183D01"
  },
  {
    label: "LineDraw1263",
    equation: "X76126552Y-145651177D01"
  },
  {
    label: "LineDraw1264",
    equation: "X75890180Y-145399907D01"
  },
  {
    label: "LineDraw1265",
    equation: "X75890176Y-145399904D01"
  },
  {
    label: "LineDraw1266",
    equation: "X75887730Y-145397303D01"
  },
  {
    label: "LineDraw1267",
    equation: "X75697809Y-145236523D01"
  },
  {
    label: "LineDraw1268",
    equation: "X75621698Y-145172090D01"
  },
  {
    label: "LineDraw1269",
    equation: "X75621694Y-145172087D01"
  },
  {
    label: "LineDraw1270",
    equation: "X75618976Y-145169786D01"
  },
  {
    label: "LineDraw1271",
    equation: "X75477842Y-145075483D01"
  },
  {
    label: "LineDraw1272",
    equation: "X75329170Y-144976144D01"
  },
  {
    label: "LineDraw1273",
    equation: "X75329168Y-144976143D01"
  },
  {
    label: "LineDraw1274",
    equation: "X75326193Y-144974155D01"
  },
  {
    label: "LineDraw1275",
    equation: "X75257841Y-144938951D01"
  },
  {
    label: "LineDraw1276",
    equation: "X75016330Y-144814564D01"
  },
  {
    label: "LineDraw1277",
    equation: "X75016325Y-144814562D01"
  },
  {
    label: "LineDraw1278",
    equation: "X75013147Y-144812925D01"
  },
  {
    label: "LineDraw1279",
    equation: "X75009806Y-144811659D01"
  },
  {
    label: "LineDraw1280",
    equation: "X75009801Y-144811657D01"
  },
  {
    label: "LineDraw1281",
    equation: "X74687205Y-144689437D01"
  },
  {
    label: "LineDraw1282",
    equation: "X74687206Y-144689437D01"
  },
  {
    label: "LineDraw1283",
    equation: "X74683861Y-144688170D01"
  },
  {
    label: "LineDraw1284",
    equation: "X74680397Y-144687290D01"
  },
  {
    label: "LineDraw1285",
    equation: "X74680393Y-144687289D01"
  },
  {
    label: "LineDraw1286",
    equation: "X74346037Y-144602373D01"
  },
  {
    label: "LineDraw1287",
    equation: "X74346029Y-144602371D01"
  },
  {
    label: "LineDraw1288",
    equation: "X74342570Y-144601493D01"
  },
  {
    label: "LineDraw1289",
    equation: "X74170848Y-144578122D01"
  },
  {
    label: "LineDraw1290",
    equation: "X73996653Y-144554415D01"
  },
  {
    label: "LineDraw1291",
    equation: "X73996646Y-144554414D01"
  },
  {
    label: "LineDraw1292",
    equation: "X73993660Y-144554008D01"
  },
  {
    label: "LineDraw1293",
    equation: "X73878919Y-144549500D01"
  },
  {
    label: "LineDraw1294",
    equation: "X73660802Y-144549500D01"
  },
  {
    label: "LineDraw1295",
    equation: "X73519244Y-144557538D01"
  },
  {
    label: "LineDraw1296",
    equation: "X73402008Y-144564195D01"
  },
  {
    label: "LineDraw1297",
    equation: "X73402001Y-144564196D01"
  },
  {
    label: "LineDraw1298",
    equation: "X73398440Y-144564398D01"
  },
  {
    label: "LineDraw1299",
    equation: "X73260117Y-144588166D01"
  },
  {
    label: "LineDraw1300",
    equation: "X73054918Y-144623425D01"
  },
  {
    label: "LineDraw1301",
    equation: "X73054910Y-144623427D01"
  },
  {
    label: "LineDraw1302",
    equation: "X73051400Y-144624030D01"
  },
  {
    label: "LineDraw1303",
    equation: "X73047975Y-144625028D01"
  },
  {
    label: "LineDraw1304",
    equation: "X73047972Y-144625029D01"
  },
  {
    label: "LineDraw1305",
    equation: "X72834370Y-144687289D01"
  },
  {
    label: "LineDraw1306",
    equation: "X72713341Y-144722566D01"
  },
  {
    label: "LineDraw1307",
    equation: "X72710039Y-144723951D01"
  },
  {
    label: "LineDraw1308",
    equation: "X72710038Y-144723951D01"
  },
  {
    label: "LineDraw1309",
    equation: "X72391908Y-144857354D01"
  },
  {
    label: "LineDraw1310",
    equation: "X72388610Y-144858737D01"
  },
  {
    label: "LineDraw1311",
    equation: "X72247850Y-144937566D01"
  },
  {
    label: "LineDraw1312",
    equation: "X72084498Y-145029047D01"
  },
  {
    label: "LineDraw1313",
    equation: "X72084493Y-145029050D01"
  },
  {
    label: "LineDraw1314",
    equation: "X72081381Y-145030793D01"
  },
  {
    label: "LineDraw1315",
    equation: "X72078485Y-145032878D01"
  },
  {
    label: "LineDraw1316",
    equation: "X72078480Y-145032881D01"
  },
  {
    label: "LineDraw1317",
    equation: "X72023649Y-145072354D01"
  },
  {
    label: "LineDraw1318",
    equation: "X71795605Y-145236523D01"
  },
  {
    label: "LineDraw1319",
    equation: "X71792969Y-145238917D01"
  },
  {
    label: "LineDraw1320",
    equation: "X71792967Y-145238919D01"
  },
  {
    label: "LineDraw1321",
    equation: "X71615733Y-145399907D01"
  },
  {
    label: "LineDraw1322",
    equation: "X71534954Y-145473281D01"
  },
  {
    label: "LineDraw1323",
    equation: "X71532603Y-145475962D01"
  },
  {
    label: "LineDraw1324",
    equation: "X71338235Y-145697596D01"
  },
  {
    label: "LineDraw1325",
    equation: "X71302781Y-145738023D01"
  },
  {
    label: "LineDraw1326",
    equation: "X71102071Y-146027347D01"
  },
  {
    label: "LineDraw1327",
    equation: "X71100380Y-146030494D01"
  },
  {
    label: "LineDraw1328",
    equation: "X71100377Y-146030499D01"
  },
  {
    label: "LineDraw1329",
    equation: "X71042537Y-146138145D01"
  },
  {
    label: "LineDraw1330",
    equation: "X70935402Y-146337532D01"
  },
  {
    label: "LineDraw1331",
    equation: "X70934075Y-146340857D01"
  },
  {
    label: "LineDraw1332",
    equation: "X70934075Y-146340858D01"
  },
  {
    label: "LineDraw1333",
    equation: "X70918551Y-146379770D01"
  },
  {
    label: "LineDraw1334",
    equation: "X70804919Y-146664590D01"
  },
  {
    label: "LineDraw1335",
    equation: "X70712299Y-147004317D01"
  },
  {
    label: "LineDraw1336",
    equation: "X70658732Y-147352345D01"
  },
  {
    label: "LineDraw1337",
    equation: "X70658592Y-147355909D01"
  },
  {
    label: "LineDraw1338",
    equation: "X70649027Y-147599370D01"
  },
  {
    label: "LineDraw1339",
    equation: "X70644908Y-147704200D01"
  },
  {
    label: "LineDraw1340",
    equation: "X70671004Y-148055358D01"
  },
  {
    label: "LineDraw1341",
    equation: "X70736684Y-148401304D01"
  },
  {
    label: "LineDraw1342",
    equation: "X70841104Y-148737592D01"
  },
  {
    label: "LineDraw1343",
    equation: "X70842545Y-148740867D01"
  },
  {
    label: "LineDraw1344",
    equation: "X70889226Y-148846957D01"
  },
  {
    label: "LineDraw1345",
    equation: "X70982921Y-149059897D01"
  },
  {
    label: "LineDraw1346",
    equation: "X71160313Y-149364076D01"
  },
  {
    label: "LineDraw1347",
    equation: "X71370999Y-149646219D01"
  },
  {
    label: "LineDraw1348",
    equation: "X71373443Y-149648817D01"
  },
  {
    label: "LineDraw1349",
    equation: "X71373448Y-149648823D01"
  },
  {
    label: "LineDraw1350",
    equation: "X71609820Y-149900093D01"
  },
  {
    label: "LineDraw1351",
    equation: "X71612270Y-149902697D01"
  },
  {
    label: "LineDraw1352",
    equation: "X71633099Y-149920330D01"
  },
  {
    label: "LineDraw1353",
    equation: "X71804652Y-150065560D01"
  },
  {
    label: "LineDraw1354",
    equation: "X71881024Y-150130214D01"
  },
  {
    label: "LineDraw1355",
    equation: "X71883988Y-150132194D01"
  },
  {
    label: "LineDraw1356",
    equation: "X71883990Y-150132196D01"
  },
  {
    label: "LineDraw1357",
    equation: "X72106033Y-150280560D01"
  },
  {
    label: "LineDraw1358",
    equation: "X72173807Y-150325845D01"
  },
  {
    label: "LineDraw1359",
    equation: "X72176989Y-150327484D01"
  },
  {
    label: "LineDraw1360",
    equation: "X72176991Y-150327485D01"
  },
  {
    label: "LineDraw1361",
    equation: "X72470173Y-150478484D01"
  },
  {
    label: "LineDraw1362",
    equation: "X72521575Y-150527457D01"
  },
  {
    label: "LineDraw1363",
    equation: "X72538341Y-150596446D01"
  },
  {
    label: "LineDraw1364",
    equation: "X72515146Y-150663547D01"
  },
  {
    label: "LineDraw1365",
    equation: "X72459357Y-150707456D01"
  },
  {
    label: "LineDraw1366",
    equation: "X72412481Y-150716500D01"
  },
  {
    label: "LineDraw1367",
    equation: "X52485902Y-150716500D01"
  },
  {
    label: "LineDraw1368",
    equation: "X52417781Y-150696498D01"
  },
  {
    label: "LineDraw1369",
    equation: "X52371288Y-150642842D01"
  },
  {
    label: "LineDraw1370",
    equation: "X52361184Y-150572568D01"
  },
  {
    label: "LineDraw1371",
    equation: "X52390678Y-150507988D01"
  },
  {
    label: "LineDraw1372",
    equation: "X52417513Y-150484826D01"
  },
  {
    label: "LineDraw1373",
    equation: "X52418619Y-150484207D01"
  },
  {
    label: "LineDraw1374",
    equation: "X52704395Y-150278477D01"
  },
  {
    label: "LineDraw1375",
    equation: "X52712679Y-150270953D01"
  },
  {
    label: "LineDraw1376",
    equation: "X52962405Y-150044118D01"
  },
  {
    label: "LineDraw1377",
    equation: "X52962406Y-150044117D01"
  },
  {
    label: "LineDraw1378",
    equation: "X52965046Y-150041719D01"
  },
  {
    label: "LineDraw1379",
    equation: "X53089249Y-149900093D01"
  },
  {
    label: "LineDraw1380",
    equation: "X53194868Y-149779658D01"
  },
  {
    label: "LineDraw1381",
    equation: "X53194869Y-149779656D01"
  },
  {
    label: "LineDraw1382",
    equation: "X53197219Y-149776977D01"
  },
  {
    label: "LineDraw1383",
    equation: "X53232931Y-149725499D01"
  },
  {
    label: "LineDraw1384",
    equation: "X53286122Y-149648823D01"
  },
  {
    label: "LineDraw1385",
    equation: "X53397929Y-149487653D01"
  },
  {
    label: "LineDraw1386",
    equation: "X53406279Y-149472114D01"
  },
  {
    label: "LineDraw1387",
    equation: "X53562902Y-149180624D01"
  },
  {
    label: "LineDraw1388",
    equation: "X53564598Y-149177468D01"
  },
  {
    label: "LineDraw1389",
    equation: "X53568097Y-149168699D01"
  },
  {
    label: "LineDraw1390",
    equation: "X53634366Y-149002593D01"
  },
  {
    label: "LineDraw1391",
    equation: "X53695081Y-148850410D01"
  },
  {
    label: "LineDraw1392",
    equation: "X53787701Y-148510683D01"
  },
  {
    label: "LineDraw1393",
    equation: "X53841268Y-148162655D01"
  },
  {
    label: "LineDraw1394",
    equation: "X53855092Y-147810800D01"
  },
  {
    label: "LineDraw1395",
    equation: "X53828996Y-147459642D01"
  },
  {
    label: "LineDraw1396",
    equation: "X53763316Y-147113696D01"
  },
  {
    label: "LineDraw1397",
    equation: "X53658896Y-146777408D01"
  },
  {
    label: "LineDraw1398",
    equation: "X53657455Y-146774133D01"
  },
  {
    label: "LineDraw1399",
    equation: "X53518522Y-146458382D01"
  },
  {
    label: "LineDraw1400",
    equation: "X53518520Y-146458379D01"
  },
  {
    label: "LineDraw1401",
    equation: "X53517079Y-146455103D01"
  },
  {
    label: "LineDraw1402",
    equation: "X53339687Y-146150924D01"
  },
  {
    label: "LineDraw1403",
    equation: "X53129001Y-145868781D01"
  },
  {
    label: "LineDraw1404",
    equation: "X53126557Y-145866183D01"
  },
  {
    label: "LineDraw1405",
    equation: "X53126552Y-145866177D01"
  },
  {
    label: "LineDraw1406",
    equation: "X52890180Y-145614907D01"
  },
  {
    label: "LineDraw1407",
    equation: "X52890176Y-145614904D01"
  },
  {
    label: "LineDraw1408",
    equation: "X52887730Y-145612303D01"
  },
  {
    label: "LineDraw1409",
    equation: "X52769308Y-145512051D01"
  },
  {
    label: "LineDraw1410",
    equation: "X52621698Y-145387090D01"
  },
  {
    label: "LineDraw1411",
    equation: "X52621694Y-145387087D01"
  },
  {
    label: "LineDraw1412",
    equation: "X52618976Y-145384786D01"
  },
  {
    label: "LineDraw1413",
    equation: "X52397085Y-145236523D01"
  },
  {
    label: "LineDraw1414",
    equation: "X52329170Y-145191144D01"
  },
  {
    label: "LineDraw1415",
    equation: "X52329168Y-145191143D01"
  },
  {
    label: "LineDraw1416",
    equation: "X52326193Y-145189155D01"
  },
  {
    label: "LineDraw1417",
    equation: "X52323009Y-145187515D01"
  },
  {
    label: "LineDraw1418",
    equation: "X52016330Y-145029564D01"
  },
  {
    label: "LineDraw1419",
    equation: "X52016325Y-145029562D01"
  },
  {
    label: "LineDraw1420",
    equation: "X52013147Y-145027925D01"
  },
  {
    label: "LineDraw1421",
    equation: "X52009806Y-145026659D01"
  },
  {
    label: "LineDraw1422",
    equation: "X52009801Y-145026657D01"
  },
  {
    label: "LineDraw1423",
    equation: "X51687205Y-144904437D01"
  },
  {
    label: "LineDraw1424",
    equation: "X51687206Y-144904437D01"
  },
  {
    label: "LineDraw1425",
    equation: "X51683861Y-144903170D01"
  },
  {
    label: "LineDraw1426",
    equation: "X51680397Y-144902290D01"
  },
  {
    label: "LineDraw1427",
    equation: "X51680393Y-144902289D01"
  },
  {
    label: "LineDraw1428",
    equation: "X51346037Y-144817373D01"
  },
  {
    label: "LineDraw1429",
    equation: "X51346029Y-144817371D01"
  },
  {
    label: "LineDraw1430",
    equation: "X51342570Y-144816493D01"
  },
  {
    label: "LineDraw1431",
    equation: "X51170848Y-144793122D01"
  },
  {
    label: "LineDraw1432",
    equation: "X50996653Y-144769415D01"
  },
  {
    label: "LineDraw1433",
    equation: "X50996646Y-144769414D01"
  },
  {
    label: "LineDraw1434",
    equation: "X50993660Y-144769008D01"
  },
  {
    label: "LineDraw1435",
    equation: "X50878919Y-144764500D01"
  },
  {
    label: "LineDraw1436",
    equation: "X50660802Y-144764500D01"
  },
  {
    label: "LineDraw1437",
    equation: "X50519244Y-144772538D01"
  },
  {
    label: "LineDraw1438",
    equation: "X50402008Y-144779195D01"
  },
  {
    label: "LineDraw1439",
    equation: "X50402001Y-144779196D01"
  },
  {
    label: "LineDraw1440",
    equation: "X50398440Y-144779398D01"
  },
  {
    label: "LineDraw1441",
    equation: "X50260117Y-144803166D01"
  },
  {
    label: "LineDraw1442",
    equation: "X50054918Y-144838425D01"
  },
  {
    label: "LineDraw1443",
    equation: "X50054910Y-144838427D01"
  },
  {
    label: "LineDraw1444",
    equation: "X50051400Y-144839030D01"
  },
  {
    label: "LineDraw1445",
    equation: "X50047975Y-144840028D01"
  },
  {
    label: "LineDraw1446",
    equation: "X50047972Y-144840029D01"
  },
  {
    label: "LineDraw1447",
    equation: "X49834370Y-144902289D01"
  },
  {
    label: "LineDraw1448",
    equation: "X49713341Y-144937566D01"
  },
  {
    label: "LineDraw1449",
    equation: "X49710039Y-144938951D01"
  },
  {
    label: "LineDraw1450",
    equation: "X49710038Y-144938951D01"
  },
  {
    label: "LineDraw1451",
    equation: "X49391908Y-145072354D01"
  },
  {
    label: "LineDraw1452",
    equation: "X49388610Y-145073737D01"
  },
  {
    label: "LineDraw1453",
    equation: "X49234996Y-145159765D01"
  },
  {
    label: "LineDraw1454",
    equation: "X49084498Y-145244047D01"
  },
  {
    label: "LineDraw1455",
    equation: "X49084493Y-145244050D01"
  },
  {
    label: "LineDraw1456",
    equation: "X49081381Y-145245793D01"
  },
  {
    label: "LineDraw1457",
    equation: "X49078485Y-145247878D01"
  },
  {
    label: "LineDraw1458",
    equation: "X49078480Y-145247881D01"
  },
  {
    label: "LineDraw1459",
    equation: "X48931761Y-145353504D01"
  },
  {
    label: "LineDraw1460",
    equation: "X48795605Y-145451523D01"
  },
  {
    label: "LineDraw1461",
    equation: "X48792969Y-145453917D01"
  },
  {
    label: "LineDraw1462",
    equation: "X48792967Y-145453919D01"
  },
  {
    label: "LineDraw1463",
    equation: "X48537595Y-145685882D01"
  },
  {
    label: "LineDraw1464",
    equation: "X48534954Y-145688281D01"
  },
  {
    label: "LineDraw1465",
    equation: "X48532603Y-145690962D01"
  },
  {
    label: "LineDraw1466",
    equation: "X48317676Y-145936039D01"
  },
  {
    label: "LineDraw1467",
    equation: "X48302781Y-145953023D01"
  },
  {
    label: "LineDraw1468",
    equation: "X48300749Y-145955952D01"
  },
  {
    label: "LineDraw1469",
    equation: "X48300746Y-145955956D01"
  },
  {
    label: "LineDraw1470",
    equation: "X48137164Y-146191761D01"
  },
  {
    label: "LineDraw1471",
    equation: "X48081901Y-146236331D01"
  },
  {
    label: "LineDraw1472",
    equation: "X48011314Y-146243949D01"
  },
  {
    label: "LineDraw1473",
    equation: "X47947814Y-146212195D01"
  },
  {
    label: "LineDraw1474",
    equation: "X47911562Y-146151152D01"
  },
  {
    label: "LineDraw1475",
    equation: "X47909187Y-146100235D01"
  },
  {
    label: "LineDraw1476",
    equation: "X47910098Y-146094482D01"
  },
  {
    label: "LineDraw1477",
    equation: "X47912505Y-146082856D01"
  },
  {
    label: "LineDraw1478",
    equation: "X47921528Y-146047711D01"
  },
  {
    label: "LineDraw1479",
    equation: "X47921528Y-146047710D01"
  },
  {
    label: "LineDraw1480",
    equation: "X47923500Y-146040030D01"
  },
  {
    label: "LineDraw1481",
    equation: "X47923500Y-146019776D01"
  },
  {
    label: "LineDraw1482",
    equation: "X47925051Y-146000065D01"
  },
  {
    label: "LineDraw1483",
    equation: "X47926980Y-145987886D01"
  },
  {
    label: "LineDraw1484",
    equation: "X47928220Y-145980057D01"
  },
  {
    label: "LineDraw1485",
    equation: "X47924059Y-145936038D01"
  },
  {
    label: "LineDraw1486",
    equation: "X47923500Y-145924181D01"
  },
  {
    label: "LineDraw1487",
    equation: "X47923500Y-143768767D01"
  },
  {
    label: "LineDraw1488",
    equation: "X47924027Y-143757584D01"
  },
  {
    label: "LineDraw1489",
    equation: "X47925702Y-143750091D01"
  },
  {
    label: "LineDraw1490",
    equation: "X47924550Y-143713458D01"
  },
  {
    label: "LineDraw1491",
    equation: "X47942401Y-143644745D01"
  },
  {
    label: "LineDraw1492",
    equation: "X47994569Y-143596588D01"
  },
  {
    label: "LineDraw1493",
    equation: "X48050488Y-143583500D01"
  },
  {
    label: "LineDraw1494",
    equation: "X48359274Y-143583500D01"
  },
  {
    label: "LineDraw1495",
    equation: "X48427395Y-143603502D01"
  },
  {
    label: "LineDraw1496",
    equation: "X48466707Y-143643665D01"
  },
  {
    label: "LineDraw1497",
    equation: "X48534987Y-143755088D01"
  },
  {
    label: "LineDraw1498",
    equation: "X48681250Y-143923938D01"
  },
  {
    label: "LineDraw1499",
    equation: "X48853126Y-144066632D01"
  },
  {
    label: "LineDraw1500",
    equation: "X49046000Y-144179338D01"
  },
  {
    label: "LineDraw1501",
    equation: "X49254692Y-144259030D01"
  },
  {
    label: "LineDraw1502",
    equation: "X49259760Y-144260061D01"
  },
  {
    label: "LineDraw1503",
    equation: "X49259763Y-144260062D01"
  },
  {
    label: "LineDraw1504",
    equation: "X49367017Y-144281883D01"
  },
  {
    label: "LineDraw1505",
    equation: "X49473597Y-144303567D01"
  },
  {
    label: "LineDraw1506",
    equation: "X49478772Y-144303757D01"
  },
  {
    label: "LineDraw1507",
    equation: "X49478774Y-144303757D01"
  },
  {
    label: "LineDraw1508",
    equation: "X49691673Y-144311564D01"
  },
  {
    label: "LineDraw1509",
    equation: "X49691677Y-144311564D01"
  },
  {
    label: "LineDraw1510",
    equation: "X49696837Y-144311753D01"
  },
  {
    label: "LineDraw1511",
    equation: "X49701957Y-144311097D01"
  },
  {
    label: "LineDraw1512",
    equation: "X49701959Y-144311097D01"
  },
  {
    label: "LineDraw1513",
    equation: "X49913288Y-144284025D01"
  },
  {
    label: "LineDraw1514",
    equation: "X49913289Y-144284025D01"
  },
  {
    label: "LineDraw1515",
    equation: "X49918416Y-144283368D01"
  },
  {
    label: "LineDraw1516",
    equation: "X49923366Y-144281883D01"
  },
  {
    label: "LineDraw1517",
    equation: "X50127429Y-144220661D01"
  },
  {
    label: "LineDraw1518",
    equation: "X50127434Y-144220659D01"
  },
  {
    label: "LineDraw1519",
    equation: "X50132384Y-144219174D01"
  },
  {
    label: "LineDraw1520",
    equation: "X50332994Y-144120896D01"
  },
  {
    label: "LineDraw1521",
    equation: "X50514860Y-143991173D01"
  },
  {
    label: "LineDraw1522",
    equation: "X50623091Y-143883319D01"
  },
  {
    label: "LineDraw1523",
    equation: "X50685462Y-143849404D01"
  },
  {
    label: "LineDraw1524",
    equation: "X50756268Y-143854592D01"
  },
  {
    label: "LineDraw1525",
    equation: "X50813030Y-143897238D01"
  },
  {
    label: "LineDraw1526",
    equation: "X50830012Y-143928341D01"
  },
  {
    label: "LineDraw1527",
    equation: "X50852201Y-143987529D01"
  },
  {
    label: "LineDraw1528",
    equation: "X50874385Y-144046705D01"
  },
  {
    label: "LineDraw1529",
    equation: "X50961739Y-144163261D01"
  },
  {
    label: "LineDraw1530",
    equation: "X51078295Y-144250615D01"
  },
  {
    label: "LineDraw1531",
    equation: "X51214684Y-144301745D01"
  },
  {
    label: "LineDraw1532",
    equation: "X51276866Y-144308500D01"
  },
  {
    label: "LineDraw1533",
    equation: "X53073134Y-144308500D01"
  },
  {
    label: "LineDraw1534",
    equation: "X53135316Y-144301745D01"
  },
  {
    label: "LineDraw1535",
    equation: "X53271705Y-144250615D01"
  },
  {
    label: "LineDraw1536",
    equation: "X53388261Y-144163261D01"
  },
  {
    label: "LineDraw1537",
    equation: "X53475615Y-144046705D01"
  },
  {
    label: "LineDraw1538",
    equation: "X53526745Y-143910316D01"
  },
  {
    label: "LineDraw1539",
    equation: "X53533500Y-143848134D01"
  },
  {
    label: "LineDraw1540",
    equation: "X53533500Y-142051866D01"
  },
  {
    label: "LineDraw1541",
    equation: "X53526745Y-141989684D01"
  },
  {
    label: "LineDraw1542",
    equation: "X53475615Y-141853295D01"
  },
  {
    label: "LineDraw1543",
    equation: "X53388261Y-141736739D01"
  },
  {
    label: "LineDraw1544",
    equation: "X53271705Y-141649385D01"
  },
  {
    label: "LineDraw1545",
    equation: "X53244905Y-141639338D01"
  },
  {
    label: "LineDraw1546",
    equation: "X53153203Y-141604960D01"
  },
  {
    label: "LineDraw1547",
    equation: "X53096439Y-141562318D01"
  },
  {
    label: "LineDraw1548",
    equation: "X53071739Y-141495756D01"
  },
  {
    label: "LineDraw1549",
    equation: "X53086947Y-141426408D01"
  },
  {
    label: "LineDraw1550",
    equation: "X53108493Y-141397727D01"
  },
  {
    label: "LineDraw1551",
    equation: "X53115056Y-141391187D01"
  },
  {
    label: "LineDraw1552",
    equation: "X53213096Y-141293489D01"
  },
  {
    label: "LineDraw1553",
    equation: "X53239116Y-141257279D01"
  },
  {
    label: "LineDraw1554",
    equation: "X53340435Y-141116277D01"
  },
  {
    label: "LineDraw1555",
    equation: "X53343453Y-141112077D01"
  },
  {
    label: "LineDraw1556",
    equation: "X53361182Y-141076206D01"
  },
  {
    label: "LineDraw1557",
    equation: "X53440136Y-140916453D01"
  },
  {
    label: "LineDraw1558",
    equation: "X53440137Y-140916451D01"
  },
  {
    label: "LineDraw1559",
    equation: "X53442430Y-140911811D01"
  },
  {
    label: "LineDraw1560",
    equation: "X53507370Y-140698069D01"
  },
  {
    label: "LineDraw1561",
    equation: "X53536529Y-140476590D01"
  },
  {
    label: "LineDraw1562",
    equation: "X53538156Y-140410000D01"
  },
  {
    label: "LineDraw1563",
    equation: "X53519852Y-140187361D01"
  },
  {
    label: "LineDraw1564",
    equation: "X53465431Y-139970702D01"
  },
  {
    label: "LineDraw1565",
    equation: "X53376354Y-139765840D01"
  },
  {
    label: "LineDraw1566",
    equation: "X53255014Y-139578277D01"
  },
  {
    label: "LineDraw1567",
    equation: "X53104670Y-139413051D01"
  },
  {
    label: "LineDraw1568",
    equation: "X53100619Y-139409852D01"
  },
  {
    label: "LineDraw1569",
    equation: "X53100615Y-139409848D01"
  },
  {
    label: "LineDraw1570",
    equation: "X52933414Y-139277800D01"
  },
  {
    label: "LineDraw1571",
    equation: "X52933410Y-139277798D01"
  },
  {
    label: "LineDraw1572",
    equation: "X52929359Y-139274598D01"
  },
  {
    label: "LineDraw1573",
    equation: "X52888053Y-139251796D01"
  },
  {
    label: "LineDraw1574",
    equation: "X52838084Y-139201364D01"
  },
  {
    label: "LineDraw1575",
    equation: "X52823312Y-139131921D01"
  },
  {
    label: "LineDraw1576",
    equation: "X52848428Y-139065516D01"
  },
  {
    label: "LineDraw1577",
    equation: "X52875780Y-139038909D01"
  },
  {
    label: "LineDraw1578",
    equation: "X52919603Y-139007650D01"
  },
  {
    label: "LineDraw1579",
    equation: "X53054860Y-138911173D01"
  },
  {
    label: "LineDraw1580",
    equation: "X53213096Y-138753489D01"
  },
  {
    label: "LineDraw1581",
    equation: "X53272594Y-138670689D01"
  },
  {
    label: "LineDraw1582",
    equation: "X53340435Y-138576277D01"
  },
  {
    label: "LineDraw1583",
    equation: "X53343453Y-138572077D01"
  },
  {
    label: "LineDraw1584",
    equation: "X53442430Y-138371811D01"
  },
  {
    label: "LineDraw1585",
    equation: "X53479257Y-138250598D01"
  },
  {
    label: "LineDraw1586",
    equation: "X53505865Y-138163023D01"
  },
  {
    label: "LineDraw1587",
    equation: "X53505865Y-138163021D01"
  },
  {
    label: "LineDraw1588",
    equation: "X53507370Y-138158069D01"
  },
  {
    label: "LineDraw1589",
    equation: "X53536529Y-137936590D01"
  },
  {
    label: "LineDraw1590",
    equation: "X53538156Y-137870000D01"
  },
  {
    label: "LineDraw1591",
    equation: "X53519852Y-137647361D01"
  },
  {
    label: "LineDraw1592",
    equation: "X53465431Y-137430702D01"
  },
  {
    label: "LineDraw1593",
    equation: "X53376354Y-137225840D01"
  },
  {
    label: "LineDraw1594",
    equation: "X53292508Y-137096234D01"
  },
  {
    label: "LineDraw1595",
    equation: "X53257822Y-137042617D01"
  },
  {
    label: "LineDraw1596",
    equation: "X53257820Y-137042614D01"
  },
  {
    label: "LineDraw1597",
    equation: "X53255014Y-137038277D01"
  },
  {
    label: "LineDraw1598",
    equation: "X53104670Y-136873051D01"
  },
  {
    label: "LineDraw1599",
    equation: "X53100619Y-136869852D01"
  },
  {
    label: "LineDraw1600",
    equation: "X53100615Y-136869848D01"
  },
  {
    label: "LineDraw1601",
    equation: "X52933414Y-136737800D01"
  },
  {
    label: "LineDraw1602",
    equation: "X52933410Y-136737798D01"
  },
  {
    label: "LineDraw1603",
    equation: "X52929359Y-136734598D01"
  },
  {
    label: "LineDraw1604",
    equation: "X52888053Y-136711796D01"
  },
  {
    label: "LineDraw1605",
    equation: "X52838084Y-136661364D01"
  },
  {
    label: "LineDraw1606",
    equation: "X52823312Y-136591921D01"
  },
  {
    label: "LineDraw1607",
    equation: "X52848428Y-136525516D01"
  },
  {
    label: "LineDraw1608",
    equation: "X52875780Y-136498909D01"
  },
  {
    label: "LineDraw1609",
    equation: "X52919603Y-136467650D01"
  },
  {
    label: "LineDraw1610",
    equation: "X53054860Y-136371173D01"
  },
  {
    label: "LineDraw1611",
    equation: "X53213096Y-136213489D01"
  },
  {
    label: "LineDraw1612",
    equation: "X53272594Y-136130689D01"
  },
  {
    label: "LineDraw1613",
    equation: "X53340435Y-136036277D01"
  },
  {
    label: "LineDraw1614",
    equation: "X53343453Y-136032077D01"
  },
  {
    label: "LineDraw1615",
    equation: "X53364320Y-135989857D01"
  },
  {
    label: "LineDraw1616",
    equation: "X53440136Y-135836453D01"
  },
  {
    label: "LineDraw1617",
    equation: "X53440137Y-135836451D01"
  },
  {
    label: "LineDraw1618",
    equation: "X53442430Y-135831811D01"
  },
  {
    label: "LineDraw1619",
    equation: "X53486129Y-135687982D01"
  },
  {
    label: "LineDraw1620",
    equation: "X53505865Y-135623023D01"
  },
  {
    label: "LineDraw1621",
    equation: "X53505865Y-135623021D01"
  },
  {
    label: "LineDraw1622",
    equation: "X53507370Y-135618069D01"
  },
  {
    label: "LineDraw1623",
    equation: "X53536529Y-135396590D01"
  },
  {
    label: "LineDraw1624",
    equation: "X53537638Y-135351200D01"
  },
  {
    label: "LineDraw1625",
    equation: "X53538074Y-135333365D01"
  },
  {
    label: "LineDraw1626",
    equation: "X53538074Y-135333361D01"
  },
  {
    label: "LineDraw1627",
    equation: "X53538156Y-135330000D01"
  },
  {
    label: "LineDraw1628",
    equation: "X53523657Y-135153640D01"
  },
  {
    label: "LineDraw1629",
    equation: "X65399463Y-135153640D01"
  },
  {
    label: "LineDraw1630",
    equation: "X65417163Y-135334160D01"
  },
  {
    label: "LineDraw1631",
    equation: "X65474418Y-135506273D01"
  },
  {
    label: "LineDraw1632",
    equation: "X65478065Y-135512295D01"
  },
  {
    label: "LineDraw1633",
    equation: "X65478066Y-135512297D01"
  },
  {
    label: "LineDraw1634",
    equation: "X65545124Y-135623023D01"
  },
  {
    label: "LineDraw1635",
    equation: "X65568380Y-135661424D01"
  },
  {
    label: "LineDraw1636",
    equation: "X65694382Y-135791902D01"
  },
  {
    label: "LineDraw1637",
    equation: "X65846159Y-135891222D01"
  },
  {
    label: "LineDraw1638",
    equation: "X65852763Y-135893678D01"
  },
  {
    label: "LineDraw1639",
    equation: "X65852765Y-135893679D01"
  },
  {
    label: "LineDraw1640",
    equation: "X66009558Y-135951990D01"
  },
  {
    label: "LineDraw1641",
    equation: "X66009560Y-135951990D01"
  },
  {
    label: "LineDraw1642",
    equation: "X66016168Y-135954448D01"
  },
  {
    label: "LineDraw1643",
    equation: "X66099995Y-135965633D01"
  },
  {
    label: "LineDraw1644",
    equation: "X66188980Y-135977507D01"
  },
  {
    label: "LineDraw1645",
    equation: "X66188984Y-135977507D01"
  },
  {
    label: "LineDraw1646",
    equation: "X66195961Y-135978438D01"
  },
  {
    label: "LineDraw1647",
    equation: "X66202972Y-135977800D01"
  },
  {
    label: "LineDraw1648",
    equation: "X66202976Y-135977800D01"
  },
  {
    label: "LineDraw1649",
    equation: "X66345459Y-135964832D01"
  },
  {
    label: "LineDraw1650",
    equation: "X66376600Y-135961998D01"
  },
  {
    label: "LineDraw1651",
    equation: "X66383302Y-135959820D01"
  },
  {
    label: "LineDraw1652",
    equation: "X66383304Y-135959820D01"
  },
  {
    label: "LineDraw1653",
    equation: "X66542409Y-135908124D01"
  },
  {
    label: "LineDraw1654",
    equation: "X66542412Y-135908123D01"
  },
  {
    label: "LineDraw1655",
    equation: "X66549108Y-135905947D01"
  },
  {
    label: "LineDraw1656",
    equation: "X66673472Y-135831811D01"
  },
  {
    label: "LineDraw1657",
    equation: "X66698860Y-135816677D01"
  },
  {
    label: "LineDraw1658",
    equation: "X66698862Y-135816676D01"
  },
  {
    label: "LineDraw1659",
    equation: "X66704912Y-135813069D01"
  },
  {
    label: "LineDraw1660",
    equation: "X66836266Y-135687982D01"
  },
  {
    label: "LineDraw1661",
    equation: "X66936643Y-135536902D01"
  },
  {
    label: "LineDraw1662",
    equation: "X67001055Y-135367338D01"
  },
  {
    label: "LineDraw1663",
    equation: "X67004683Y-135341523D01"
  },
  {
    label: "LineDraw1664",
    equation: "X67025748Y-135191639D01"
  },
  {
    label: "LineDraw1665",
    equation: "X67025748Y-135191636D01"
  },
  {
    label: "LineDraw1666",
    equation: "X67026299Y-135187717D01"
  },
  {
    label: "LineDraw1667",
    equation: "X67026616Y-135165000D01"
  },
  {
    label: "LineDraw1668",
    equation: "X67006397Y-134984745D01"
  },
  {
    label: "LineDraw1669",
    equation: "X67004080Y-134978091D01"
  },
  {
    label: "LineDraw1670",
    equation: "X66949064Y-134820106D01"
  },
  {
    label: "LineDraw1671",
    equation: "X66949062Y-134820103D01"
  },
  {
    label: "LineDraw1672",
    equation: "X66946745Y-134813448D01"
  },
  {
    label: "LineDraw1673",
    equation: "X66867474Y-134686586D01"
  },
  {
    label: "LineDraw1674",
    equation: "X66865646Y-134683661D01"
  },
  {
    label: "LineDraw1675",
    equation: "X66846500Y-134616892D01"
  },
  {
    label: "LineDraw1676",
    equation: "X66846500Y-129233620D01"
  },
  {
    label: "LineDraw1677",
    equation: "X66867552Y-129163893D01"
  },
  {
    label: "LineDraw1678",
    equation: "X66873007Y-129155683D01"
  },
  {
    label: "LineDraw1679",
    equation: "X66936643Y-129059902D01"
  },
  {
    label: "LineDraw1680",
    equation: "X66978425Y-128949912D01"
  },
  {
    label: "LineDraw1681",
    equation: "X66998555Y-128896920D01"
  },
  {
    label: "LineDraw1682",
    equation: "X66998556Y-128896918D01"
  },
  {
    label: "LineDraw1683",
    equation: "X67001055Y-128890338D01"
  },
  {
    label: "LineDraw1684",
    equation: "X67004006Y-128869339D01"
  },
  {
    label: "LineDraw1685",
    equation: "X67025748Y-128714639D01"
  },
  {
    label: "LineDraw1686",
    equation: "X67025748Y-128714636D01"
  },
  {
    label: "LineDraw1687",
    equation: "X67026299Y-128710717D01"
  },
  {
    label: "LineDraw1688",
    equation: "X67026616Y-128688000D01"
  },
  {
    label: "LineDraw1689",
    equation: "X67006397Y-128507745D01"
  },
  {
    label: "LineDraw1690",
    equation: "X67004080Y-128501091D01"
  },
  {
    label: "LineDraw1691",
    equation: "X66949064Y-128343106D01"
  },
  {
    label: "LineDraw1692",
    equation: "X66949062Y-128343103D01"
  },
  {
    label: "LineDraw1693",
    equation: "X66946745Y-128336448D01"
  },
  {
    label: "LineDraw1694",
    equation: "X66850626Y-128182624D01"
  },
  {
    label: "LineDraw1695",
    equation: "X66781085Y-128112596D01"
  },
  {
    label: "LineDraw1696",
    equation: "X66727778Y-128058915D01"
  },
  {
    label: "LineDraw1697",
    equation: "X66727774Y-128058912D01"
  },
  {
    label: "LineDraw1698",
    equation: "X66722815Y-128053918D01"
  },
  {
    label: "LineDraw1699",
    equation: "X66711697Y-128046862D01"
  },
  {
    label: "LineDraw1700",
    equation: "X66626727Y-127992939D01"
  },
  {
    label: "LineDraw1701",
    equation: "X66569666Y-127956727D01"
  },
  {
    label: "LineDraw1702",
    equation: "X66540463Y-127946328D01"
  },
  {
    label: "LineDraw1703",
    equation: "X66405425Y-127898243D01"
  },
  {
    label: "LineDraw1704",
    equation: "X66405420Y-127898242D01"
  },
  {
    label: "LineDraw1705",
    equation: "X66398790Y-127895881D01"
  },
  {
    label: "LineDraw1706",
    equation: "X66391802Y-127895048D01"
  },
  {
    label: "LineDraw1707",
    equation: "X66391799Y-127895047D01"
  },
  {
    label: "LineDraw1708",
    equation: "X66268698Y-127880368D01"
  },
  {
    label: "LineDraw1709",
    equation: "X66218680Y-127874404D01"
  },
  {
    label: "LineDraw1710",
    equation: "X66211677Y-127875140D01"
  },
  {
    label: "LineDraw1711",
    equation: "X66211676Y-127875140D01"
  },
  {
    label: "LineDraw1712",
    equation: "X66045288Y-127892628D01"
  },
  {
    label: "LineDraw1713",
    equation: "X66045286Y-127892629D01"
  },
  {
    label: "LineDraw1714",
    equation: "X66038288Y-127893364D01"
  },
  {
    label: "LineDraw1715",
    equation: "X65866579Y-127951818D01"
  },
  {
    label: "LineDraw1716",
    equation: "X65860575Y-127955512D01"
  },
  {
    label: "LineDraw1717",
    equation: "X65718095Y-128043166D01"
  },
  {
    label: "LineDraw1718",
    equation: "X65718092Y-128043168D01"
  },
  {
    label: "LineDraw1719",
    equation: "X65712088Y-128046862D01"
  },
  {
    label: "LineDraw1720",
    equation: "X65707053Y-128051793D01"
  },
  {
    label: "LineDraw1721",
    equation: "X65707050Y-128051795D01"
  },
  {
    label: "LineDraw1722",
    equation: "X65587525Y-128168843D01"
  },
  {
    label: "LineDraw1723",
    equation: "X65582493Y-128173771D01"
  },
  {
    label: "LineDraw1724",
    equation: "X65484235Y-128326238D01"
  },
  {
    label: "LineDraw1725",
    equation: "X65481826Y-128332858D01"
  },
  {
    label: "LineDraw1726",
    equation: "X65481824Y-128332861D01"
  },
  {
    label: "LineDraw1727",
    equation: "X65424606Y-128490066D01"
  },
  {
    label: "LineDraw1728",
    equation: "X65422197Y-128496685D01"
  },
  {
    label: "LineDraw1729",
    equation: "X65399463Y-128676640D01"
  },
  {
    label: "LineDraw1730",
    equation: "X65417163Y-128857160D01"
  },
  {
    label: "LineDraw1731",
    equation: "X65474418Y-129029273D01"
  },
  {
    label: "LineDraw1732",
    equation: "X65478065Y-129035295D01"
  },
  {
    label: "LineDraw1733",
    equation: "X65478066Y-129035297D01"
  },
  {
    label: "LineDraw1734",
    equation: "X65561276Y-129172694D01"
  },
  {
    label: "LineDraw1735",
    equation: "X65579500Y-129237965D01"
  },
  {
    label: "LineDraw1736",
    equation: "X65579500Y-134618331D01"
  },
  {
    label: "LineDraw1737",
    equation: "X65559411Y-134686586D01"
  },
  {
    label: "LineDraw1738",
    equation: "X65488054Y-134797310D01"
  },
  {
    label: "LineDraw1739",
    equation: "X65488050Y-134797319D01"
  },
  {
    label: "LineDraw1740",
    equation: "X65484235Y-134803238D01"
  },
  {
    label: "LineDraw1741",
    equation: "X65481826Y-134809858D01"
  },
  {
    label: "LineDraw1742",
    equation: "X65481825Y-134809859D01"
  },
  {
    label: "LineDraw1743",
    equation: "X65450574Y-134895720D01"
  },
  {
    label: "LineDraw1744",
    equation: "X65422197Y-134973685D01"
  },
  {
    label: "LineDraw1745",
    equation: "X65399463Y-135153640D01"
  },
  {
    label: "LineDraw1746",
    equation: "X53523657Y-135153640D01"
  },
  {
    label: "LineDraw1747",
    equation: "X53519852Y-135107361D01"
  },
  {
    label: "LineDraw1748",
    equation: "X53465431Y-134890702D01"
  },
  {
    label: "LineDraw1749",
    equation: "X53376354Y-134685840D01"
  },
  {
    label: "LineDraw1750",
    equation: "X53331750Y-134616892D01"
  },
  {
    label: "LineDraw1751",
    equation: "X53257822Y-134502617D01"
  },
  {
    label: "LineDraw1752",
    equation: "X53257820Y-134502614D01"
  },
  {
    label: "LineDraw1753",
    equation: "X53255014Y-134498277D01"
  },
  {
    label: "LineDraw1754",
    equation: "X53104670Y-134333051D01"
  },
  {
    label: "LineDraw1755",
    equation: "X53100619Y-134329852D01"
  },
  {
    label: "LineDraw1756",
    equation: "X53100615Y-134329848D01"
  },
  {
    label: "LineDraw1757",
    equation: "X52933414Y-134197800D01"
  },
  {
    label: "LineDraw1758",
    equation: "X52933410Y-134197798D01"
  },
  {
    label: "LineDraw1759",
    equation: "X52929359Y-134194598D01"
  },
  {
    label: "LineDraw1760",
    equation: "X52733789Y-134086638D01"
  },
  {
    label: "LineDraw1761",
    equation: "X52728920Y-134084914D01"
  },
  {
    label: "LineDraw1762",
    equation: "X52728916Y-134084912D01"
  },
  {
    label: "LineDraw1763",
    equation: "X52528087Y-134013795D01"
  },
  {
    label: "LineDraw1764",
    equation: "X52528083Y-134013794D01"
  },
  {
    label: "LineDraw1765",
    equation: "X52523212Y-134012069D01"
  },
  {
    label: "LineDraw1766",
    equation: "X52518119Y-134011162D01"
  },
  {
    label: "LineDraw1767",
    equation: "X52518116Y-134011161D01"
  },
  {
    label: "LineDraw1768",
    equation: "X52308373Y-133973800D01"
  },
  {
    label: "LineDraw1769",
    equation: "X52308367Y-133973799D01"
  },
  {
    label: "LineDraw1770",
    equation: "X52303284Y-133972894D01"
  },
  {
    label: "LineDraw1771",
    equation: "X52229452Y-133971992D01"
  },
  {
    label: "LineDraw1772",
    equation: "X52085081Y-133970228D01"
  },
  {
    label: "LineDraw1773",
    equation: "X52085079Y-133970228D01"
  },
  {
    label: "LineDraw1774",
    equation: "X52079911Y-133970165D01"
  },
  {
    label: "LineDraw1775",
    equation: "X51859091Y-134003955D01"
  },
  {
    label: "LineDraw1776",
    equation: "X51646756Y-134073357D01"
  },
  {
    label: "LineDraw1777",
    equation: "X51616443Y-134089137D01"
  },
  {
    label: "LineDraw1778",
    equation: "X51513429Y-134142763D01"
  },
  {
    label: "LineDraw1779",
    equation: "X51448607Y-134176507D01"
  },
  {
    label: "LineDraw1780",
    equation: "X51444474Y-134179610D01"
  },
  {
    label: "LineDraw1781",
    equation: "X51444471Y-134179612D01"
  },
  {
    label: "LineDraw1782",
    equation: "X51349213Y-134251134D01"
  },
  {
    label: "LineDraw1783",
    equation: "X51269965Y-134310635D01"
  },
  {
    label: "LineDraw1784",
    equation: "X51266393Y-134314373D01"
  },
  {
    label: "LineDraw1785",
    equation: "X51134803Y-134452074D01"
  },
  {
    label: "LineDraw1786",
    equation: "X51115629Y-134472138D01"
  },
  {
    label: "LineDraw1787",
    equation: "X51008201Y-134629621D01"
  },
  {
    label: "LineDraw1788",
    equation: "X50953293Y-134674621D01"
  },
  {
    label: "LineDraw1789",
    equation: "X50882768Y-134682792D01"
  },
  {
    label: "LineDraw1790",
    equation: "X50819021Y-134651538D01"
  },
  {
    label: "LineDraw1791",
    equation: "X50798324Y-134627054D01"
  },
  {
    label: "LineDraw1792",
    equation: "X50717822Y-134502617D01"
  },
  {
    label: "LineDraw1793",
    equation: "X50717820Y-134502614D01"
  },
  {
    label: "LineDraw1794",
    equation: "X50715014Y-134498277D01"
  },
  {
    label: "LineDraw1795",
    equation: "X50564670Y-134333051D01"
  },
  {
    label: "LineDraw1796",
    equation: "X50560619Y-134329852D01"
  },
  {
    label: "LineDraw1797",
    equation: "X50560615Y-134329848D01"
  },
  {
    label: "LineDraw1798",
    equation: "X50393414Y-134197800D01"
  },
  {
    label: "LineDraw1799",
    equation: "X50393410Y-134197798D01"
  },
  {
    label: "LineDraw1800",
    equation: "X50389359Y-134194598D01"
  },
  {
    label: "LineDraw1801",
    equation: "X50348053Y-134171796D01"
  },
  {
    label: "LineDraw1802",
    equation: "X50298084Y-134121364D01"
  },
  {
    label: "LineDraw1803",
    equation: "X50283312Y-134051921D01"
  },
  {
    label: "LineDraw1804",
    equation: "X50308428Y-133985516D01"
  },
  {
    label: "LineDraw1805",
    equation: "X50335780Y-133958909D01"
  },
  {
    label: "LineDraw1806",
    equation: "X50379603Y-133927650D01"
  },
  {
    label: "LineDraw1807",
    equation: "X50514860Y-133831173D01"
  },
  {
    label: "LineDraw1808",
    equation: "X50673096Y-133673489D01"
  },
  {
    label: "LineDraw1809",
    equation: "X50687266Y-133653770D01"
  },
  {
    label: "LineDraw1810",
    equation: "X50800435Y-133496277D01"
  },
  {
    label: "LineDraw1811",
    equation: "X50803453Y-133492077D01"
  },
  {
    label: "LineDraw1812",
    equation: "X50821059Y-133456455D01"
  },
  {
    label: "LineDraw1813",
    equation: "X50900136Y-133296453D01"
  },
  {
    label: "LineDraw1814",
    equation: "X50900137Y-133296451D01"
  },
  {
    label: "LineDraw1815",
    equation: "X50902430Y-133291811D01"
  },
  {
    label: "LineDraw1816",
    equation: "X50957870Y-133109338D01"
  },
  {
    label: "LineDraw1817",
    equation: "X50965865Y-133083023D01"
  },
  {
    label: "LineDraw1818",
    equation: "X50965865Y-133083021D01"
  },
  {
    label: "LineDraw1819",
    equation: "X50967370Y-133078069D01"
  },
  {
    label: "LineDraw1820",
    equation: "X50996529Y-132856590D01"
  },
  {
    label: "LineDraw1821",
    equation: "X50997752Y-132806548D01"
  },
  {
    label: "LineDraw1822",
    equation: "X50998074Y-132793365D01"
  },
  {
    label: "LineDraw1823",
    equation: "X50998074Y-132793361D01"
  },
  {
    label: "LineDraw1824",
    equation: "X50998156Y-132790000D01"
  },
  {
    label: "LineDraw1825",
    equation: "X50979852Y-132567361D01"
  },
  {
    label: "LineDraw1826",
    equation: "X50925431Y-132350702D01"
  },
  {
    label: "LineDraw1827",
    equation: "X50836354Y-132145840D01"
  },
  {
    label: "LineDraw1828",
    equation: "X50796906Y-132084862D01"
  },
  {
    label: "LineDraw1829",
    equation: "X50717822Y-131962617D01"
  },
  {
    label: "LineDraw1830",
    equation: "X50717820Y-131962614D01"
  },
  {
    label: "LineDraw1831",
    equation: "X50715014Y-131958277D01"
  },
  {
    label: "LineDraw1832",
    equation: "X50564670Y-131793051D01"
  },
  {
    label: "LineDraw1833",
    equation: "X50560619Y-131789852D01"
  },
  {
    label: "LineDraw1834",
    equation: "X50560615Y-131789848D01"
  },
  {
    label: "LineDraw1835",
    equation: "X50393414Y-131657800D01"
  },
  {
    label: "LineDraw1836",
    equation: "X50393410Y-131657798D01"
  },
  {
    label: "LineDraw1837",
    equation: "X50389359Y-131654598D01"
  },
  {
    label: "LineDraw1838",
    equation: "X50348053Y-131631796D01"
  },
  {
    label: "LineDraw1839",
    equation: "X50298084Y-131581364D01"
  },
  {
    label: "LineDraw1840",
    equation: "X50283312Y-131511921D01"
  },
  {
    label: "LineDraw1841",
    equation: "X50308428Y-131445516D01"
  },
  {
    label: "LineDraw1842",
    equation: "X50335780Y-131418909D01"
  },
  {
    label: "LineDraw1843",
    equation: "X50379603Y-131387650D01"
  },
  {
    label: "LineDraw1844",
    equation: "X50514860Y-131291173D01"
  },
  {
    label: "LineDraw1845",
    equation: "X50673096Y-131133489D01"
  },
  {
    label: "LineDraw1846",
    equation: "X50732594Y-131050689D01"
  },
  {
    label: "LineDraw1847",
    equation: "X50803453Y-130952077D01"
  },
  {
    label: "LineDraw1848",
    equation: "X50804776Y-130953028D01"
  },
  {
    label: "LineDraw1849",
    equation: "X50851645Y-130909857D01"
  },
  {
    label: "LineDraw1850",
    equation: "X50921580Y-130897625D01"
  },
  {
    label: "LineDraw1851",
    equation: "X50987026Y-130925144D01"
  },
  {
    label: "LineDraw1852",
    equation: "X51014875Y-130956994D01"
  },
  {
    label: "LineDraw1853",
    equation: "X51074987Y-131055088D01"
  },
  {
    label: "LineDraw1854",
    equation: "X51221250Y-131223938D01"
  },
  {
    label: "LineDraw1855",
    equation: "X51393126Y-131366632D01"
  },
  {
    label: "LineDraw1856",
    equation: "X51586000Y-131479338D01"
  },
  {
    label: "LineDraw1857",
    equation: "X51590825Y-131481180D01"
  },
  {
    label: "LineDraw1858",
    equation: "X51590826Y-131481181D01"
  },
  {
    label: "LineDraw1859",
    equation: "X51642292Y-131500834D01"
  },
  {
    label: "LineDraw1860",
    equation: "X51794692Y-131559030D01"
  },
  {
    label: "LineDraw1861",
    equation: "X51799760Y-131560061D01"
  },
  {
    label: "LineDraw1862",
    equation: "X51799763Y-131560062D01"
  },
  {
    label: "LineDraw1863",
    equation: "X51883985Y-131577197D01"
  },
  {
    label: "LineDraw1864",
    equation: "X52013597Y-131603567D01"
  },
  {
    label: "LineDraw1865",
    equation: "X52018772Y-131603757D01"
  },
  {
    label: "LineDraw1866",
    equation: "X52018774Y-131603757D01"
  },
  {
    label: "LineDraw1867",
    equation: "X52231673Y-131611564D01"
  },
  {
    label: "LineDraw1868",
    equation: "X52231677Y-131611564D01"
  },
  {
    label: "LineDraw1869",
    equation: "X52236837Y-131611753D01"
  },
  {
    label: "LineDraw1870",
    equation: "X52241957Y-131611097D01"
  },
  {
    label: "LineDraw1871",
    equation: "X52241959Y-131611097D01"
  },
  {
    label: "LineDraw1872",
    equation: "X52453288Y-131584025D01"
  },
  {
    label: "LineDraw1873",
    equation: "X52453289Y-131584025D01"
  },
  {
    label: "LineDraw1874",
    equation: "X52458416Y-131583368D01"
  },
  {
    label: "LineDraw1875",
    equation: "X52465096Y-131581364D01"
  },
  {
    label: "LineDraw1876",
    equation: "X52667429Y-131520661D01"
  },
  {
    label: "LineDraw1877",
    equation: "X52667434Y-131520659D01"
  },
  {
    label: "LineDraw1878",
    equation: "X52672384Y-131519174D01"
  },
  {
    label: "LineDraw1879",
    equation: "X52872994Y-131420896D01"
  },
  {
    label: "LineDraw1880",
    equation: "X53054860Y-131291173D01"
  },
  {
    label: "LineDraw1881",
    equation: "X53213096Y-131133489D01"
  },
  {
    label: "LineDraw1882",
    equation: "X53272594Y-131050689D01"
  },
  {
    label: "LineDraw1883",
    equation: "X53340435Y-130956277D01"
  },
  {
    label: "LineDraw1884",
    equation: "X53343453Y-130952077D01"
  },
  {
    label: "LineDraw1885",
    equation: "X53364320Y-130909857D01"
  },
  {
    label: "LineDraw1886",
    equation: "X53440136Y-130756453D01"
  },
  {
    label: "LineDraw1887",
    equation: "X53440137Y-130756451D01"
  },
  {
    label: "LineDraw1888",
    equation: "X53442430Y-130751811D01"
  },
  {
    label: "LineDraw1889",
    equation: "X53507370Y-130538069D01"
  },
  {
    label: "LineDraw1890",
    equation: "X53536529Y-130316590D01"
  },
  {
    label: "LineDraw1891",
    equation: "X53538156Y-130250000D01"
  },
  {
    label: "LineDraw1892",
    equation: "X53519852Y-130027361D01"
  },
  {
    label: "LineDraw1893",
    equation: "X53465431Y-129810702D01"
  },
  {
    label: "LineDraw1894",
    equation: "X53376354Y-129605840D01"
  },
  {
    label: "LineDraw1895",
    equation: "X53255014Y-129418277D01"
  },
  {
    label: "LineDraw1896",
    equation: "X53104670Y-129253051D01"
  },
  {
    label: "LineDraw1897",
    equation: "X53100619Y-129249852D01"
  },
  {
    label: "LineDraw1898",
    equation: "X53100615Y-129249848D01"
  },
  {
    label: "LineDraw1899",
    equation: "X52933414Y-129117800D01"
  },
  {
    label: "LineDraw1900",
    equation: "X52933410Y-129117798D01"
  },
  {
    label: "LineDraw1901",
    equation: "X52929359Y-129114598D01"
  },
  {
    label: "LineDraw1902",
    equation: "X52888053Y-129091796D01"
  },
  {
    label: "LineDraw1903",
    equation: "X52838084Y-129041364D01"
  },
  {
    label: "LineDraw1904",
    equation: "X52823312Y-128971921D01"
  },
  {
    label: "LineDraw1905",
    equation: "X52848428Y-128905516D01"
  },
  {
    label: "LineDraw1906",
    equation: "X52875780Y-128878909D01"
  },
  {
    label: "LineDraw1907",
    equation: "X52927567Y-128841970D01"
  },
  {
    label: "LineDraw1908",
    equation: "X53054860Y-128751173D01"
  },
  {
    label: "LineDraw1909",
    equation: "X53099432Y-128706757D01"
  },
  {
    label: "LineDraw1910",
    equation: "X53209435Y-128597137D01"
  },
  {
    label: "LineDraw1911",
    equation: "X53213096Y-128593489D01"
  },
  {
    label: "LineDraw1912",
    equation: "X53272594Y-128510689D01"
  },
  {
    label: "LineDraw1913",
    equation: "X53340435Y-128416277D01"
  },
  {
    label: "LineDraw1914",
    equation: "X53343453Y-128412077D01"
  },
  {
    label: "LineDraw1915",
    equation: "X53377541Y-128343106D01"
  },
  {
    label: "LineDraw1916",
    equation: "X53440136Y-128216453D01"
  },
  {
    label: "LineDraw1917",
    equation: "X53440137Y-128216451D01"
  },
  {
    label: "LineDraw1918",
    equation: "X53442430Y-128211811D01"
  },
  {
    label: "LineDraw1919",
    equation: "X53492546Y-128046862D01"
  },
  {
    label: "LineDraw1920",
    equation: "X53505865Y-128003023D01"
  },
  {
    label: "LineDraw1921",
    equation: "X53505865Y-128003021D01"
  },
  {
    label: "LineDraw1922",
    equation: "X53507370Y-127998069D01"
  },
  {
    label: "LineDraw1923",
    equation: "X53536529Y-127776590D01"
  },
  {
    label: "LineDraw1924",
    equation: "X53538156Y-127710000D01"
  },
  {
    label: "LineDraw1925",
    equation: "X53519852Y-127487361D01"
  },
  {
    label: "LineDraw1926",
    equation: "X53465431Y-127270702D01"
  },
  {
    label: "LineDraw1927",
    equation: "X53376354Y-127065840D01"
  },
  {
    label: "LineDraw1928",
    equation: "X53255014Y-126878277D01"
  },
  {
    label: "LineDraw1929",
    equation: "X53104670Y-126713051D01"
  },
  {
    label: "LineDraw1930",
    equation: "X53100619Y-126709852D01"
  },
  {
    label: "LineDraw1931",
    equation: "X53100615Y-126709848D01"
  },
  {
    label: "LineDraw1932",
    equation: "X52933414Y-126577800D01"
  },
  {
    label: "LineDraw1933",
    equation: "X52933410Y-126577798D01"
  },
  {
    label: "LineDraw1934",
    equation: "X52929359Y-126574598D01"
  },
  {
    label: "LineDraw1935",
    equation: "X52888053Y-126551796D01"
  },
  {
    label: "LineDraw1936",
    equation: "X52838084Y-126501364D01"
  },
  {
    label: "LineDraw1937",
    equation: "X52823312Y-126431921D01"
  },
  {
    label: "LineDraw1938",
    equation: "X52848428Y-126365516D01"
  },
  {
    label: "LineDraw1939",
    equation: "X52875780Y-126338909D01"
  },
  {
    label: "LineDraw1940",
    equation: "X52919603Y-126307650D01"
  },
  {
    label: "LineDraw1941",
    equation: "X53054860Y-126211173D01"
  },
  {
    label: "LineDraw1942",
    equation: "X53213096Y-126053489D01"
  },
  {
    label: "LineDraw1943",
    equation: "X53272594Y-125970689D01"
  },
  {
    label: "LineDraw1944",
    equation: "X53340435Y-125876277D01"
  },
  {
    label: "LineDraw1945",
    equation: "X53343453Y-125872077D01"
  },
  {
    label: "LineDraw1946",
    equation: "X53364320Y-125829857D01"
  },
  {
    label: "LineDraw1947",
    equation: "X53440136Y-125676453D01"
  },
  {
    label: "LineDraw1948",
    equation: "X53440137Y-125676451D01"
  },
  {
    label: "LineDraw1949",
    equation: "X53442430Y-125671811D01"
  },
  {
    label: "LineDraw1950",
    equation: "X53507370Y-125458069D01"
  },
  {
    label: "LineDraw1951",
    equation: "X53536529Y-125236590D01"
  },
  {
    label: "LineDraw1952",
    equation: "X53538156Y-125170000D01"
  },
  {
    label: "LineDraw1953",
    equation: "X53519852Y-124947361D01"
  },
  {
    label: "LineDraw1954",
    equation: "X53465431Y-124730702D01"
  },
  {
    label: "LineDraw1955",
    equation: "X53376354Y-124525840D01"
  },
  {
    label: "LineDraw1956",
    equation: "X53255014Y-124338277D01"
  },
  {
    label: "LineDraw1957",
    equation: "X53104670Y-124173051D01"
  },
  {
    label: "LineDraw1958",
    equation: "X53100619Y-124169852D01"
  },
  {
    label: "LineDraw1959",
    equation: "X53100615Y-124169848D01"
  },
  {
    label: "LineDraw1960",
    equation: "X52933414Y-124037800D01"
  },
  {
    label: "LineDraw1961",
    equation: "X52933410Y-124037798D01"
  },
  {
    label: "LineDraw1962",
    equation: "X52929359Y-124034598D01"
  },
  {
    label: "LineDraw1963",
    equation: "X52888053Y-124011796D01"
  },
  {
    label: "LineDraw1964",
    equation: "X52838084Y-123961364D01"
  },
  {
    label: "LineDraw1965",
    equation: "X52823312Y-123891921D01"
  },
  {
    label: "LineDraw1966",
    equation: "X52848428Y-123825516D01"
  },
  {
    label: "LineDraw1967",
    equation: "X52875780Y-123798909D01"
  },
  {
    label: "LineDraw1968",
    equation: "X52919603Y-123767650D01"
  },
  {
    label: "LineDraw1969",
    equation: "X53054860Y-123671173D01"
  },
  {
    label: "LineDraw1970",
    equation: "X53213096Y-123513489D01"
  },
  {
    label: "LineDraw1971",
    equation: "X53249704Y-123462544D01"
  },
  {
    label: "LineDraw1972",
    equation: "X53340435Y-123336277D01"
  },
  {
    label: "LineDraw1973",
    equation: "X53343453Y-123332077D01"
  },
  {
    label: "LineDraw1974",
    equation: "X53364320Y-123289857D01"
  },
  {
    label: "LineDraw1975",
    equation: "X53440136Y-123136453D01"
  },
  {
    label: "LineDraw1976",
    equation: "X53440137Y-123136451D01"
  },
  {
    label: "LineDraw1977",
    equation: "X53442430Y-123131811D01"
  },
  {
    label: "LineDraw1978",
    equation: "X53507370Y-122918069D01"
  },
  {
    label: "LineDraw1979",
    equation: "X53536529Y-122696590D01"
  },
  {
    label: "LineDraw1980",
    equation: "X53538156Y-122630000D01"
  },
  {
    label: "LineDraw1981",
    equation: "X53519852Y-122407361D01"
  },
  {
    label: "LineDraw1982",
    equation: "X53465431Y-122190702D01"
  },
  {
    label: "LineDraw1983",
    equation: "X53376354Y-121985840D01"
  },
  {
    label: "LineDraw1984",
    equation: "X53255014Y-121798277D01"
  },
  {
    label: "LineDraw1985",
    equation: "X53104670Y-121633051D01"
  },
  {
    label: "LineDraw1986",
    equation: "X53100619Y-121629852D01"
  },
  {
    label: "LineDraw1987",
    equation: "X53100615Y-121629848D01"
  },
  {
    label: "LineDraw1988",
    equation: "X52933414Y-121497800D01"
  },
  {
    label: "LineDraw1989",
    equation: "X52933410Y-121497798D01"
  },
  {
    label: "LineDraw1990",
    equation: "X52929359Y-121494598D01"
  },
  {
    label: "LineDraw1991",
    equation: "X52888053Y-121471796D01"
  },
  {
    label: "LineDraw1992",
    equation: "X52838084Y-121421364D01"
  },
  {
    label: "LineDraw1993",
    equation: "X52823312Y-121351921D01"
  },
  {
    label: "LineDraw1994",
    equation: "X52848428Y-121285516D01"
  },
  {
    label: "LineDraw1995",
    equation: "X52875780Y-121258909D01"
  },
  {
    label: "LineDraw1996",
    equation: "X52919603Y-121227650D01"
  },
  {
    label: "LineDraw1997",
    equation: "X53054860Y-121131173D01"
  },
  {
    label: "LineDraw1998",
    equation: "X53213096Y-120973489D01"
  },
  {
    label: "LineDraw1999",
    equation: "X53272594Y-120890689D01"
  },
  {
    label: "LineDraw2000",
    equation: "X53340435Y-120796277D01"
  },
  {
    label: "LineDraw2001",
    equation: "X53343453Y-120792077D01"
  },
  {
    label: "LineDraw2002",
    equation: "X53442430Y-120591811D01"
  },
  {
    label: "LineDraw2003",
    equation: "X53507370Y-120378069D01"
  },
  {
    label: "LineDraw2004",
    equation: "X53536529Y-120156590D01"
  },
  {
    label: "LineDraw2005",
    equation: "X53538156Y-120090000D01"
  },
  {
    label: "LineDraw2006",
    equation: "X53519852Y-119867361D01"
  },
  {
    label: "LineDraw2007",
    equation: "X53465431Y-119650702D01"
  },
  {
    label: "LineDraw2008",
    equation: "X53376354Y-119445840D01"
  },
  {
    label: "LineDraw2009",
    equation: "X53278655Y-119294820D01"
  },
  {
    label: "LineDraw2010",
    equation: "X53257822Y-119262617D01"
  },
  {
    label: "LineDraw2011",
    equation: "X53257820Y-119262614D01"
  },
  {
    label: "LineDraw2012",
    equation: "X53255014Y-119258277D01"
  },
  {
    label: "LineDraw2013",
    equation: "X53104670Y-119093051D01"
  },
  {
    label: "LineDraw2014",
    equation: "X53100619Y-119089852D01"
  },
  {
    label: "LineDraw2015",
    equation: "X53100615Y-119089848D01"
  },
  {
    label: "LineDraw2016",
    equation: "X52933414Y-118957800D01"
  },
  {
    label: "LineDraw2017",
    equation: "X52933410Y-118957798D01"
  },
  {
    label: "LineDraw2018",
    equation: "X52929359Y-118954598D01"
  },
  {
    label: "LineDraw2019",
    equation: "X52888053Y-118931796D01"
  },
  {
    label: "LineDraw2020",
    equation: "X52838084Y-118881364D01"
  },
  {
    label: "LineDraw2021",
    equation: "X52823312Y-118811921D01"
  },
  {
    label: "LineDraw2022",
    equation: "X52848428Y-118745516D01"
  },
  {
    label: "LineDraw2023",
    equation: "X52875780Y-118718909D01"
  },
  {
    label: "LineDraw2024",
    equation: "X52936155Y-118675844D01"
  },
  {
    label: "LineDraw2025",
    equation: "X53054860Y-118591173D01"
  },
  {
    label: "LineDraw2026",
    equation: "X53213096Y-118433489D01"
  },
  {
    label: "LineDraw2027",
    equation: "X53272594Y-118350689D01"
  },
  {
    label: "LineDraw2028",
    equation: "X53340435Y-118256277D01"
  },
  {
    label: "LineDraw2029",
    equation: "X53343453Y-118252077D01"
  },
  {
    label: "LineDraw2030",
    equation: "X53364320Y-118209857D01"
  },
  {
    label: "LineDraw2031",
    equation: "X53440136Y-118056453D01"
  },
  {
    label: "LineDraw2032",
    equation: "X53440137Y-118056451D01"
  },
  {
    label: "LineDraw2033",
    equation: "X53442430Y-118051811D01"
  },
  {
    label: "LineDraw2034",
    equation: "X53507370Y-117838069D01"
  },
  {
    label: "LineDraw2035",
    equation: "X53536529Y-117616590D01"
  },
  {
    label: "LineDraw2036",
    equation: "X53538156Y-117550000D01"
  },
  {
    label: "LineDraw2037",
    equation: "X53519852Y-117327361D01"
  },
  {
    label: "LineDraw2038",
    equation: "X53465431Y-117110702D01"
  },
  {
    label: "LineDraw2039",
    equation: "X53376354Y-116905840D01"
  },
  {
    label: "LineDraw2040",
    equation: "X53266049Y-116735335D01"
  },
  {
    label: "LineDraw2041",
    equation: "X53245843Y-116667277D01"
  },
  {
    label: "LineDraw2042",
    equation: "X53265639Y-116599096D01"
  },
  {
    label: "LineDraw2043",
    equation: "X53282747Y-116577802D01"
  },
  {
    label: "LineDraw2044",
    equation: "X53728798Y-116131751D01"
  },
  {
    label: "LineDraw2045",
    equation: "X53791110Y-116097725D01"
  },
  {
    label: "LineDraw2046",
    equation: "X53817893Y-116094846D01"
  },
  {
    label: "LineDraw2047",
    equation: "X55172057Y-116094846D01"
  },
  {
    label: "LineDraw2048",
    equation: "X55240178Y-116114848D01"
  },
  {
    label: "LineDraw2049",
    equation: "X55261152Y-116131751D01"
  },
  {
    label: "LineDraw2050",
    equation: "X71304570Y-132175169D01"
  },
  {
    label: "LineDraw2051",
    equation: "X71338596Y-132237481D01"
  },
  {
    label: "LineDraw2052",
    equation: "X71341475Y-132264264D01"
  },
  {
    label: "LineDraw2053",
    equation: "X71341475Y-133241839D01"
  },
  {
    label: "LineDraw2054",
    equation: "X71340397Y-133258282D01"
  },
  {
    label: "LineDraw2055",
    equation: "X71336225Y-133289975D01"
  },
  {
    label: "LineDraw2056",
    equation: "X71337303Y-133298164D01"
  },
  {
    label: "LineDraw2057",
    equation: "X71341475Y-133329855D01"
  },
  {
    label: "LineDraw2058",
    equation: "X71341475Y-133329860D01"
  },
  {
    label: "LineDraw2059",
    equation: "X71346717Y-133369677D01"
  },
  {
    label: "LineDraw2060",
    equation: "X71355794Y-133438621D01"
  },
  {
    label: "LineDraw2061",
    equation: "X71357137Y-133448826D01"
  },
  {
    label: "LineDraw2062",
    equation: "X71418451Y-133596851D01"
  },
  {
    label: "LineDraw2063",
    equation: "X71423478Y-133603402D01"
  },
  {
    label: "LineDraw2064",
    equation: "X71423479Y-133603404D01"
  },
  {
    label: "LineDraw2065",
    equation: "X71491495Y-133692044D01"
  },
  {
    label: "LineDraw2066",
    equation: "X71491501Y-133692050D01"
  },
  {
    label: "LineDraw2067",
    equation: "X71515988Y-133723962D01"
  },
  {
    label: "LineDraw2068",
    equation: "X71522543Y-133728992D01"
  },
  {
    label: "LineDraw2069",
    equation: "X71541354Y-133743427D01"
  },
  {
    label: "LineDraw2070",
    equation: "X71553745Y-133754294D01"
  },
  {
    label: "LineDraw2071",
    equation: "X74895685Y-137096234D01"
  },
  {
    label: "LineDraw2072",
    equation: "X74906552Y-137108625D01"
  },
  {
    label: "LineDraw2073",
    equation: "X74926013Y-137133987D01"
  },
  {
    label: "LineDraw2074",
    equation: "X74932563Y-137139013D01"
  },
  {
    label: "LineDraw2075",
    equation: "X74957921Y-137158471D01"
  },
  {
    label: "LineDraw2076",
    equation: "X74957937Y-137158485D01"
  },
  {
    label: "LineDraw2077",
    equation: "X75002138Y-137192401D01"
  },
  {
    label: "LineDraw2078",
    equation: "X75053124Y-137231524D01"
  },
  {
    label: "LineDraw2079",
    equation: "X75201149Y-137292838D01"
  },
  {
    label: "LineDraw2080",
    equation: "X75360000Y-137313751D01"
  },
  {
    label: "LineDraw2081",
    equation: "X75391699Y-137309578D01"
  },
  {
    label: "LineDraw2082",
    equation: "X75408144Y-137308500D01"
  },
  {
    label: "LineDraw2083",
    equation: "X81901864Y-137308500D01"
  },
  {
    label: "LineDraw2084",
    equation: "X81918307Y-137309578D01"
  },
  {
    label: "LineDraw2085",
    equation: "X81950000Y-137313750D01"
  },
  {
    label: "LineDraw2086",
    equation: "X81958189Y-137312672D01"
  },
  {
    label: "LineDraw2087",
    equation: "X81989874Y-137308501D01"
  },
  {
    label: "LineDraw2088",
    equation: "X81989884Y-137308500D01"
  },
  {
    label: "LineDraw2089",
    equation: "X81989885Y-137308500D01"
  },
  {
    label: "LineDraw2090",
    equation: "X82089457Y-137295391D01"
  },
  {
    label: "LineDraw2091",
    equation: "X82100664Y-137293916D01"
  },
  {
    label: "LineDraw2092",
    equation: "X82100666Y-137293915D01"
  },
  {
    label: "LineDraw2093",
    equation: "X82108851Y-137292838D01"
  },
  {
    label: "LineDraw2094",
    equation: "X82256876Y-137231524D01"
  },
  {
    label: "LineDraw2095",
    equation: "X82263430Y-137226495D01"
  },
  {
    label: "LineDraw2096",
    equation: "X82352069Y-137158480D01"
  },
  {
    label: "LineDraw2097",
    equation: "X82352075Y-137158474D01"
  },
  {
    label: "LineDraw2098",
    equation: "X82377434Y-137139015D01"
  },
  {
    label: "LineDraw2099",
    equation: "X82383987Y-137133987D01"
  },
  {
    label: "LineDraw2100",
    equation: "X82389017Y-137127432D01"
  },
  {
    label: "LineDraw2101",
    equation: "X82403452Y-137108621D01"
  },
  {
    label: "LineDraw2102",
    equation: "X82414319Y-137096230D01"
  },
  {
    label: "LineDraw2103",
    equation: "X83246234Y-136264315D01"
  },
  {
    label: "LineDraw2104",
    equation: "X83258625Y-136253448D01"
  },
  {
    label: "LineDraw2105",
    equation: "X83277437Y-136239013D01"
  },
  {
    label: "LineDraw2106",
    equation: "X83283987Y-136233987D01"
  },
  {
    label: "LineDraw2107",
    equation: "X83308474Y-136202075D01"
  },
  {
    label: "LineDraw2108",
    equation: "X83308480Y-136202069D01"
  },
  {
    label: "LineDraw2109",
    equation: "X83376496Y-136113429D01"
  },
  {
    label: "LineDraw2110",
    equation: "X83376497Y-136113427D01"
  },
  {
    label: "LineDraw2111",
    equation: "X83381524Y-136106876D01"
  },
  {
    label: "LineDraw2112",
    equation: "X83412506Y-136032077D01"
  },
  {
    label: "LineDraw2113",
    equation: "X83442838Y-135958850D01"
  },
  {
    label: "LineDraw2114",
    equation: "X83451742Y-135891222D01"
  },
  {
    label: "LineDraw2115",
    equation: "X83458500Y-135839885D01"
  },
  {
    label: "LineDraw2116",
    equation: "X83458500Y-135839878D01"
  },
  {
    label: "LineDraw2117",
    equation: "X83462672Y-135808188D01"
  },
  {
    label: "LineDraw2118",
    equation: "X83463750Y-135800000D01"
  },
  {
    label: "LineDraw2119",
    equation: "X83459578Y-135768307D01"
  },
  {
    label: "LineDraw2120",
    equation: "X83458500Y-135751864D01"
  },
  {
    label: "LineDraw2121",
    equation: "X83458500Y-133308136D01"
  },
  {
    label: "LineDraw2122",
    equation: "X83459578Y-133291690D01"
  },
  {
    label: "LineDraw2123",
    equation: "X83462672Y-133268188D01"
  },
  {
    label: "LineDraw2124",
    equation: "X83463750Y-133260000D01"
  },
  {
    label: "LineDraw2125",
    equation: "X83458500Y-133220122D01"
  },
  {
    label: "LineDraw2126",
    equation: "X83458500Y-133220115D01"
  },
  {
    label: "LineDraw2127",
    equation: "X83442838Y-133101150D01"
  },
  {
    label: "LineDraw2128",
    equation: "X83423204Y-133053749D01"
  },
  {
    label: "LineDraw2129",
    equation: "X83384684Y-132960753D01"
  },
  {
    label: "LineDraw2130",
    equation: "X83384683Y-132960751D01"
  },
  {
    label: "LineDraw2131",
    equation: "X83381524Y-132953125D01"
  },
  {
    label: "LineDraw2132",
    equation: "X83342696Y-132902524D01"
  },
  {
    label: "LineDraw2133",
    equation: "X83308477Y-132857928D01"
  },
  {
    label: "LineDraw2134",
    equation: "X83308474Y-132857925D01"
  },
  {
    label: "LineDraw2135",
    equation: "X83304879Y-132853240D01"
  },
  {
    label: "LineDraw2136",
    equation: "X83289016Y-132832566D01"
  },
  {
    label: "LineDraw2137",
    equation: "X83289013Y-132832563D01"
  },
  {
    label: "LineDraw2138",
    equation: "X83283987Y-132826013D01"
  },
  {
    label: "LineDraw2139",
    equation: "X83277432Y-132820983D01"
  },
  {
    label: "LineDraw2140",
    equation: "X83258621Y-132806548D01"
  },
  {
    label: "LineDraw2141",
    equation: "X83246230Y-132795681D01"
  },
  {
    label: "LineDraw2142",
    equation: "X80445405Y-129994856D01"
  },
  {
    label: "LineDraw2143",
    equation: "X80411379Y-129932544D01"
  },
  {
    label: "LineDraw2144",
    equation: "X80408500Y-129905761D01"
  },
  {
    label: "LineDraw2145",
    equation: "X80408500Y-127409694D01"
  },
  {
    label: "LineDraw2146",
    equation: "X80428502Y-127341573D01"
  },
  {
    label: "LineDraw2147",
    equation: "X80482158Y-127295080D01"
  },
  {
    label: "LineDraw2148",
    equation: "X80495556Y-127289864D01"
  },
  {
    label: "LineDraw2149",
    equation: "X80577655Y-127263189D01"
  },
  {
    label: "LineDraw2150",
    equation: "X80639409Y-127243124D01"
  },
  {
    label: "LineDraw2151",
    equation: "X80639412Y-127243123D01"
  },
  {
    label: "LineDraw2152",
    equation: "X80646108Y-127240947D01"
  },
  {
    label: "LineDraw2153",
    equation: "X80801912Y-127148069D01"
  },
  {
    label: "LineDraw2154",
    equation: "X80933266Y-127022982D01"
  },
  {
    label: "LineDraw2155",
    equation: "X81033643Y-126871902D01"
  },
  {
    label: "LineDraw2156",
    equation: "X81093303Y-126714848D01"
  },
  {
    label: "LineDraw2157",
    equation: "X81095555Y-126708920D01"
  },
  {
    label: "LineDraw2158",
    equation: "X81095556Y-126708918D01"
  },
  {
    label: "LineDraw2159",
    equation: "X81098055Y-126702338D01"
  },
  {
    label: "LineDraw2160",
    equation: "X81099035Y-126695366D01"
  },
  {
    label: "LineDraw2161",
    equation: "X81122748Y-126526639D01"
  },
  {
    label: "LineDraw2162",
    equation: "X81122748Y-126526636D01"
  },
  {
    label: "LineDraw2163",
    equation: "X81123299Y-126522717D01"
  },
  {
    label: "LineDraw2164",
    equation: "X81123616Y-126500000D01"
  },
  {
    label: "LineDraw2165",
    equation: "X81123174Y-126496063D01"
  },
  {
    label: "LineDraw2166",
    equation: "X81122981Y-126492111D01"
  },
  {
    label: "LineDraw2167",
    equation: "X81124593Y-126492032D01"
  },
  {
    label: "LineDraw2168",
    equation: "X81135745Y-126428604D01"
  },
  {
    label: "LineDraw2169",
    equation: "X81183891Y-126376426D01"
  },
  {
    label: "LineDraw2170",
    equation: "X81248668Y-126358500D01"
  },
  {
    label: "LineDraw2171",
    equation: "X90451864Y-126358500D01"
  },
  {
    label: "LineDraw2172",
    equation: "X90468307Y-126359578D01"
  },
  {
    label: "LineDraw2173",
    equation: "X90500000Y-126363750D01"
  },
  {
    label: "LineDraw2174",
    equation: "X90508189Y-126362672D01"
  },
  {
    label: "LineDraw2175",
    equation: "X90539874Y-126358501D01"
  },
  {
    label: "LineDraw2176",
    equation: "X90539884Y-126358500D01"
  },
  {
    label: "LineDraw2177",
    equation: "X90539885Y-126358500D01"
  },
  {
    label: "LineDraw2178",
    equation: "X90639457Y-126345391D01"
  },
  {
    label: "LineDraw2179",
    equation: "X90650664Y-126343916D01"
  },
  {
    label: "LineDraw2180",
    equation: "X90650666Y-126343915D01"
  },
  {
    label: "LineDraw2181",
    equation: "X90658851Y-126342838D01"
  },
  {
    label: "LineDraw2182",
    equation: "X90806876Y-126281524D01"
  },
  {
    label: "LineDraw2183",
    equation: "X90894652Y-126214171D01"
  },
  {
    label: "LineDraw2184",
    equation: "X90902072Y-126208477D01"
  },
  {
    label: "LineDraw2185",
    equation: "X90902075Y-126208474D01"
  },
  {
    label: "LineDraw2186",
    equation: "X90927434Y-126189015D01"
  },
  {
    label: "LineDraw2187",
    equation: "X90933987Y-126183987D01"
  },
  {
    label: "LineDraw2188",
    equation: "X90941143Y-126174661D01"
  },
  {
    label: "LineDraw2189",
    equation: "X90953452Y-126158621D01"
  },
  {
    label: "LineDraw2190",
    equation: "X90964319Y-126146230D01"
  },
  {
    label: "LineDraw2191",
    equation: "X94896234Y-122214315D01"
  },
  {
    label: "LineDraw2192",
    equation: "X94908625Y-122203448D01"
  },
  {
    label: "LineDraw2193",
    equation: "X94927437Y-122189013D01"
  },
  {
    label: "LineDraw2194",
    equation: "X94933987Y-122183987D01"
  },
  {
    label: "LineDraw2195",
    equation: "X94958474Y-122152075D01"
  },
  {
    label: "LineDraw2196",
    equation: "X94958480Y-122152069D01"
  },
  {
    label: "LineDraw2197",
    equation: "X95026496Y-122063429D01"
  },
  {
    label: "LineDraw2198",
    equation: "X95026497Y-122063427D01"
  },
  {
    label: "LineDraw2199",
    equation: "X95031524Y-122056876D01"
  },
  {
    label: "LineDraw2200",
    equation: "X95073983Y-121954369D01"
  },
  {
    label: "LineDraw2201",
    equation: "X95092838Y-121908850D01"
  },
  {
    label: "LineDraw2202",
    equation: "X95108500Y-121789885D01"
  },
  {
    label: "LineDraw2203",
    equation: "X95108500Y-121789878D01"
  },
  {
    label: "LineDraw2204",
    equation: "X95113750Y-121750000D01"
  },
  {
    label: "LineDraw2205",
    equation: "X95109578Y-121718307D01"
  },
  {
    label: "LineDraw2206",
    equation: "X95108500Y-121701864D01"
  },
  {
    label: "LineDraw2207",
    equation: "X95108500Y-114554239D01"
  },
  {
    label: "LineDraw2208",
    equation: "X95128502Y-114486118D01"
  },
  {
    label: "LineDraw2209",
    equation: "X95145405Y-114465144D01"
  },
  {
    label: "LineDraw2210",
    equation: "X97400754Y-112209795D01"
  },
  {
    label: "LineDraw2211",
    equation: "X97463066Y-112175769D01"
  },
  {
    label: "LineDraw2212",
    equation: "X97533881Y-112180834D01"
  },
  {
    label: "LineDraw2213",
    equation: "X97590717Y-112223381D01"
  },
  {
    label: "LineDraw2214",
    equation: "X97597620Y-112233611D01"
  },
  {
    label: "LineDraw2215",
    equation: "X97605380Y-112246424D01"
  },
  {
    label: "LineDraw2216",
    equation: "X97610276Y-112251494D01"
  },
  {
    label: "LineDraw2217",
    equation: "X97614571Y-112257071D01"
  },
  {
    label: "LineDraw2218",
    equation: "X97612243Y-112258864D01"
  },
  {
    label: "LineDraw2219",
    equation: "X97639071Y-112310115D01"
  },
  {
    label: "LineDraw2220",
    equation: "X97641500Y-112334734D01"
  },
  {
    label: "LineDraw2221",
    equation: "X97641500Y-117915164D01"
  },
  {
    label: "LineDraw2222",
    equation: "X97621498Y-117983285D01"
  },
  {
    label: "LineDraw2223",
    equation: "X97620188Y-117985090D01"
  },
  {
    label: "LineDraw2224",
    equation: "X97619493Y-117985771D01"
  },
  {
    label: "LineDraw2225",
    equation: "X97617894Y-117988253D01"
  },
  {
    label: "LineDraw2226",
    equation: "X97617892Y-117988255D01"
  },
  {
    label: "LineDraw2227",
    equation: "X97609934Y-118000603D01"
  },
  {
    label: "LineDraw2228",
    equation: "X97521235Y-118138238D01"
  },
  {
    label: "LineDraw2229",
    equation: "X97518826Y-118144858D01"
  },
  {
    label: "LineDraw2230",
    equation: "X97518824Y-118144861D01"
  },
  {
    label: "LineDraw2231",
    equation: "X97478272Y-118256277D01"
  },
  {
    label: "LineDraw2232",
    equation: "X97459197Y-118308685D01"
  },
  {
    label: "LineDraw2233",
    equation: "X97436463Y-118488640D01"
  },
  {
    label: "LineDraw2234",
    equation: "X97454163Y-118669160D01"
  },
  {
    label: "LineDraw2235",
    equation: "X97511418Y-118841273D01"
  },
  {
    label: "LineDraw2236",
    equation: "X97515065Y-118847295D01"
  },
  {
    label: "LineDraw2237",
    equation: "X97515066Y-118847297D01"
  },
  {
    label: "LineDraw2238",
    equation: "X97581989Y-118957800D01"
  },
  {
    label: "LineDraw2239",
    equation: "X97605380Y-118996424D01"
  },
  {
    label: "LineDraw2240",
    equation: "X97731382Y-119126902D01"
  },
  {
    label: "LineDraw2241",
    equation: "X97883159Y-119226222D01"
  },
  {
    label: "LineDraw2242",
    equation: "X97889763Y-119228678D01"
  },
  {
    label: "LineDraw2243",
    equation: "X97889765Y-119228679D01"
  },
  {
    label: "LineDraw2244",
    equation: "X98046558Y-119286990D01"
  },
  {
    label: "LineDraw2245",
    equation: "X98046560Y-119286990D01"
  },
  {
    label: "LineDraw2246",
    equation: "X98053168Y-119289448D01"
  },
  {
    label: "LineDraw2247",
    equation: "X98136995Y-119300633D01"
  },
  {
    label: "LineDraw2248",
    equation: "X98225980Y-119312507D01"
  },
  {
    label: "LineDraw2249",
    equation: "X98225984Y-119312507D01"
  },
  {
    label: "LineDraw2250",
    equation: "X98232961Y-119313438D01"
  },
  {
    label: "LineDraw2251",
    equation: "X98239972Y-119312800D01"
  },
  {
    label: "LineDraw2252",
    equation: "X98239976Y-119312800D01"
  },
  {
    label: "LineDraw2253",
    equation: "X98382459Y-119299832D01"
  },
  {
    label: "LineDraw2254",
    equation: "X98413600Y-119296998D01"
  },
  {
    label: "LineDraw2255",
    equation: "X98420302Y-119294820D01"
  },
  {
    label: "LineDraw2256",
    equation: "X98420304Y-119294820D01"
  },
  {
    label: "LineDraw2257",
    equation: "X98579409Y-119243124D01"
  },
  {
    label: "LineDraw2258",
    equation: "X98579412Y-119243123D01"
  },
  {
    label: "LineDraw2259",
    equation: "X98586108Y-119240947D01"
  },
  {
    label: "LineDraw2260",
    equation: "X98741912Y-119148069D01"
  },
  {
    label: "LineDraw2261",
    equation: "X98873266Y-119022982D01"
  },
  {
    label: "LineDraw2262",
    equation: "X98973643Y-118871902D01"
  },
  {
    label: "LineDraw2263",
    equation: "X99021653Y-118745516D01"
  },
  {
    label: "LineDraw2264",
    equation: "X99035555Y-118708920D01"
  },
  {
    label: "LineDraw2265",
    equation: "X99035556Y-118708918D01"
  },
  {
    label: "LineDraw2266",
    equation: "X99038055Y-118702338D01"
  },
  {
    label: "LineDraw2267",
    equation: "X99039035Y-118695366D01"
  },
  {
    label: "LineDraw2268",
    equation: "X99062748Y-118526639D01"
  },
  {
    label: "LineDraw2269",
    equation: "X99062748Y-118526636D01"
  },
  {
    label: "LineDraw2270",
    equation: "X99063299Y-118522717D01"
  },
  {
    label: "LineDraw2271",
    equation: "X99063616Y-118500000D01"
  },
  {
    label: "LineDraw2272",
    equation: "X99043397Y-118319745D01"
  },
  {
    label: "LineDraw2273",
    equation: "X99041080Y-118313091D01"
  },
  {
    label: "LineDraw2274",
    equation: "X98986064Y-118155106D01"
  },
  {
    label: "LineDraw2275",
    equation: "X98986062Y-118155103D01"
  },
  {
    label: "LineDraw2276",
    equation: "X98983745Y-118148448D01"
  },
  {
    label: "LineDraw2277",
    equation: "X98887626Y-117994624D01"
  },
  {
    label: "LineDraw2278",
    equation: "X98885215Y-117992196D01"
  },
  {
    label: "LineDraw2279",
    equation: "X98859117Y-117927716D01"
  },
  {
    label: "LineDraw2280",
    equation: "X98858500Y-117915263D01"
  },
  {
    label: "LineDraw2281",
    equation: "X98858500Y-112333248D01"
  },
  {
    label: "LineDraw2282",
    equation: "X98879552Y-112263521D01"
  },
  {
    label: "LineDraw2283",
    equation: "X98923416Y-112197500D01"
  },
  {
    label: "LineDraw2284",
    equation: "X98973643Y-112121902D01"
  },
  {
    label: "LineDraw2285",
    equation: "X98976144Y-112115317D01"
  },
  {
    label: "LineDraw2286",
    equation: "X98976147Y-112115312D01"
  },
  {
    label: "LineDraw2287",
    equation: "X98984526Y-112093253D01"
  },
  {
    label: "LineDraw2288",
    equation: "X99027414Y-112036675D01"
  },
  {
    label: "LineDraw2289",
    equation: "X99094083Y-112012265D01"
  },
  {
    label: "LineDraw2290",
    equation: "X99146231Y-112019898D01"
  },
  {
    label: "LineDraw2291",
    equation: "X99303668Y-112078448D01"
  },
  {
    label: "LineDraw2292",
    equation: "X99303125Y-112079907D01"
  },
  {
    label: "LineDraw2293",
    equation: "X99357239Y-112111608D01"
  },
  {
    label: "LineDraw2294",
    equation: "X99389371Y-112174916D01"
  },
  {
    label: "LineDraw2295",
    equation: "X99391500Y-112197979D01"
  },
  {
    label: "LineDraw2296",
    equation: "X99391500Y-119705811D01"
  },
  {
    label: "LineDraw2297",
    equation: "X99371498Y-119773932D01"
  },
  {
    label: "LineDraw2298",
    equation: "X99354595Y-119794906D01"
  },
  {
    label: "LineDraw2299",
    equation: "X90403766Y-128745735D01"
  },
  {
    label: "LineDraw2300",
    equation: "X90391375Y-128756602D01"
  },
  {
    label: "LineDraw2301",
    equation: "X90366013Y-128776063D01"
  },
  {
    label: "LineDraw2302",
    equation: "X90341526Y-128807975D01"
  },
  {
    label: "LineDraw2303",
    equation: "X90341523Y-128807978D01"
  },
  {
    label: "LineDraw2304",
    equation: "X90341517Y-128807986D01"
  },
  {
    label: "LineDraw2305",
    equation: "X90276413Y-128892831D01"
  },
  {
    label: "LineDraw2306",
    equation: "X90268476Y-128903174D01"
  },
  {
    label: "LineDraw2307",
    equation: "X90244465Y-128961142D01"
  },
  {
    label: "LineDraw2308",
    equation: "X90231121Y-128993357D01"
  },
  {
    label: "LineDraw2309",
    equation: "X90212304Y-129038787D01"
  },
  {
    label: "LineDraw2310",
    equation: "X90207162Y-129051200D01"
  },
  {
    label: "LineDraw2311",
    equation: "X90206084Y-129059388D01"
  },
  {
    label: "LineDraw2312",
    equation: "X90198394Y-129117800D01"
  },
  {
    label: "LineDraw2313",
    equation: "X90191500Y-129170165D01"
  },
  {
    label: "LineDraw2314",
    equation: "X90191500Y-129170170D01"
  },
  {
    label: "LineDraw2315",
    equation: "X90186250Y-129210050D01"
  },
  {
    label: "LineDraw2316",
    equation: "X90187328Y-129218238D01"
  },
  {
    label: "LineDraw2317",
    equation: "X90190422Y-129241740D01"
  },
  {
    label: "LineDraw2318",
    equation: "X90191500Y-129258186D01"
  },
  {
    label: "LineDraw2319",
    equation: "X90191500Y-130085761D01"
  },
  {
    label: "LineDraw2320",
    equation: "X90171498Y-130153882D01"
  },
  {
    label: "LineDraw2321",
    equation: "X90154595Y-130174856D01"
  },
  {
    label: "LineDraw2322",
    equation: "X86924856Y-133404595D01"
  },
  {
    label: "LineDraw2323",
    equation: "X86862544Y-133438621D01"
  },
  {
    label: "LineDraw2324",
    equation: "X86835761Y-133441500D01"
  },
  {
    label: "LineDraw2325",
    equation: "X86758194Y-133441500D01"
  },
  {
    label: "LineDraw2326",
    equation: "X86741748Y-133440422D01"
  },
  {
    label: "LineDraw2327",
    equation: "X86718238Y-133437327D01"
  },
  {
    label: "LineDraw2328",
    equation: "X86710050Y-133436249D01"
  },
  {
    label: "LineDraw2329",
    equation: "X86551200Y-133457162D01"
  },
  {
    label: "LineDraw2330",
    equation: "X86543573Y-133460321D01"
  },
  {
    label: "LineDraw2331",
    equation: "X86543570Y-133460322D01"
  },
  {
    label: "LineDraw2332",
    equation: "X86507787Y-133475144D01"
  },
  {
    label: "LineDraw2333",
    equation: "X86403174Y-133518476D01"
  },
  {
    label: "LineDraw2334",
    equation: "X86378439Y-133537456D01"
  },
  {
    label: "LineDraw2335",
    equation: "X86307987Y-133591515D01"
  },
  {
    label: "LineDraw2336",
    equation: "X86307971Y-133591529D01"
  },
  {
    label: "LineDraw2337",
    equation: "X86282616Y-133610984D01"
  },
  {
    label: "LineDraw2338",
    equation: "X86282613Y-133610987D01"
  },
  {
    label: "LineDraw2339",
    equation: "X86276063Y-133616013D01"
  },
  {
    label: "LineDraw2340",
    equation: "X86271033Y-133622568D01"
  },
  {
    label: "LineDraw2341",
    equation: "X86256598Y-133641379D01"
  },
  {
    label: "LineDraw2342",
    equation: "X86245731Y-133653770D01"
  },
  {
    label: "LineDraw2343",
    equation: "X84853766Y-135045735D01"
  },
  {
    label: "LineDraw2344",
    equation: "X84841375Y-135056602D01"
  },
  {
    label: "LineDraw2345",
    equation: "X84816013Y-135076063D01"
  },
  {
    label: "LineDraw2346",
    equation: "X84791526Y-135107975D01"
  },
  {
    label: "LineDraw2347",
    equation: "X84791523Y-135107978D01"
  },
  {
    label: "LineDraw2348",
    equation: "X84791517Y-135107986D01"
  },
  {
    label: "LineDraw2349",
    equation: "X84730337Y-135187717D01"
  },
  {
    label: "LineDraw2350",
    equation: "X84718476Y-135203174D01"
  },
  {
    label: "LineDraw2351",
    equation: "X84661170Y-135341523D01"
  },
  {
    label: "LineDraw2352",
    equation: "X84657162Y-135351200D01"
  },
  {
    label: "LineDraw2353",
    equation: "X84641500Y-135470165D01"
  },
  {
    label: "LineDraw2354",
    equation: "X84641500Y-135470170D01"
  },
  {
    label: "LineDraw2355",
    equation: "X84636250Y-135510050D01"
  },
  {
    label: "LineDraw2356",
    equation: "X84638188Y-135524767D01"
  },
  {
    label: "LineDraw2357",
    equation: "X84640422Y-135541740D01"
  },
  {
    label: "LineDraw2358",
    equation: "X84641500Y-135558186D01"
  },
  {
    label: "LineDraw2359",
    equation: "X84641500Y-137660406D01"
  },
  {
    label: "LineDraw2360",
    equation: "X84621498Y-137728527D01"
  },
  {
    label: "LineDraw2361",
    equation: "X84604595Y-137749501D01"
  },
  {
    label: "LineDraw2362",
    equation: "X82144500Y-140209595D01"
  },
  {
    label: "LineDraw2363",
    equation: "X82082188Y-140243621D01"
  },
  {
    label: "LineDraw2364",
    equation: "X82055405Y-140246500D01"
  },
  {
    label: "LineDraw2365",
    equation: "X78478200Y-140246500D01"
  },
  {
    label: "LineDraw2366",
    equation: "X78410079Y-140226498D01"
  },
  {
    label: "LineDraw2367",
    equation: "X78390853Y-140210157D01"
  },
  {
    label: "LineDraw2368",
    equation: "X78390580Y-140210460D01"
  },
  {
    label: "LineDraw2369",
    equation: "X78385668Y-140206037D01"
  },
  {
    label: "LineDraw2370",
    equation: "X78381253Y-140201134D01"
  },
  {
    label: "LineDraw2371",
    equation: "X78226752Y-140088882D01"
  },
  {
    label: "LineDraw2372",
    equation: "X78220724Y-140086198D01"
  },
  {
    label: "LineDraw2373",
    equation: "X78220722Y-140086197D01"
  },
  {
    label: "LineDraw2374",
    equation: "X78058319Y-140013891D01"
  },
  {
    label: "LineDraw2375",
    equation: "X78058318Y-140013891D01"
  },
  {
    label: "LineDraw2376",
    equation: "X78052288Y-140011206D01"
  },
  {
    label: "LineDraw2377",
    equation: "X77957227Y-139991000D01"
  },
  {
    label: "LineDraw2378",
    equation: "X77871944Y-139972872D01"
  },
  {
    label: "LineDraw2379",
    equation: "X77871939Y-139972872D01"
  },
  {
    label: "LineDraw2380",
    equation: "X77865487Y-139971500D01"
  },
  {
    label: "LineDraw2381",
    equation: "X77674513Y-139971500D01"
  },
  {
    label: "LineDraw2382",
    equation: "X77668061Y-139972872D01"
  },
  {
    label: "LineDraw2383",
    equation: "X77668056Y-139972872D01"
  },
  {
    label: "LineDraw2384",
    equation: "X77582773Y-139991000D01"
  },
  {
    label: "LineDraw2385",
    equation: "X77487712Y-140011206D01"
  },
  {
    label: "LineDraw2386",
    equation: "X77481682Y-140013891D01"
  },
  {
    label: "LineDraw2387",
    equation: "X77481681Y-140013891D01"
  },
  {
    label: "LineDraw2388",
    equation: "X77319278Y-140086197D01"
  },
  {
    label: "LineDraw2389",
    equation: "X77319276Y-140086198D01"
  },
  {
    label: "LineDraw2390",
    equation: "X77313248Y-140088882D01"
  },
  {
    label: "LineDraw2391",
    equation: "X77158747Y-140201134D01"
  },
  {
    label: "LineDraw2392",
    equation: "X77154326Y-140206044D01"
  },
  {
    label: "LineDraw2393",
    equation: "X77154325Y-140206045D01"
  },
  {
    label: "LineDraw2394",
    equation: "X77120492Y-140243621D01"
  },
  {
    label: "LineDraw2395",
    equation: "X77030960Y-140343056D01"
  },
  {
    label: "LineDraw2396",
    equation: "X76935473Y-140508444D01"
  },
  {
    label: "LineDraw2397",
    equation: "X76876458Y-140690072D01"
  },
  {
    label: "LineDraw2398",
    equation: "X76875768Y-140696633D01"
  },
  {
    label: "LineDraw2399",
    equation: "X76875768Y-140696635D01"
  },
  {
    label: "LineDraw2400",
    equation: "X76858192Y-140863868D01"
  },
  {
    label: "LineDraw2401",
    equation: "X76856496Y-140880000D01"
  },
  {
    label: "LineDraw2402",
    equation: "X76857186Y-140886565D01"
  },
  {
    label: "LineDraw2403",
    equation: "X76871696Y-141024616D01"
  },
  {
    label: "LineDraw2404",
    equation: "X76876458Y-141069928D01"
  },
  {
    label: "LineDraw2405",
    equation: "X76935473Y-141251556D01"
  },
  {
    label: "LineDraw2406",
    equation: "X77030960Y-141416944D01"
  },
  {
    label: "LineDraw2407",
    equation: "X77035378Y-141421851D01"
  },
  {
    label: "LineDraw2408",
    equation: "X77035379Y-141421852D01"
  },
  {
    label: "LineDraw2409",
    equation: "X77129723Y-141526632D01"
  },
  {
    label: "LineDraw2410",
    equation: "X77158747Y-141558866D01"
  },
  {
    label: "LineDraw2411",
    equation: "X77313248Y-141671118D01"
  },
  {
    label: "LineDraw2412",
    equation: "X77319276Y-141673802D01"
  },
  {
    label: "LineDraw2413",
    equation: "X77319278Y-141673803D01"
  },
  {
    label: "LineDraw2414",
    equation: "X77481681Y-141746109D01"
  },
  {
    label: "LineDraw2415",
    equation: "X77487712Y-141748794D01"
  },
  {
    label: "LineDraw2416",
    equation: "X77581112Y-141768647D01"
  },
  {
    label: "LineDraw2417",
    equation: "X77668056Y-141787128D01"
  },
  {
    label: "LineDraw2418",
    equation: "X77668061Y-141787128D01"
  },
  {
    label: "LineDraw2419",
    equation: "X77674513Y-141788500D01"
  },
  {
    label: "LineDraw2420",
    equation: "X77865487Y-141788500D01"
  },
  {
    label: "LineDraw2421",
    equation: "X77871939Y-141787128D01"
  },
  {
    label: "LineDraw2422",
    equation: "X77871944Y-141787128D01"
  },
  {
    label: "LineDraw2423",
    equation: "X77958888Y-141768647D01"
  },
  {
    label: "LineDraw2424",
    equation: "X78052288Y-141748794D01"
  },
  {
    label: "LineDraw2425",
    equation: "X78058319Y-141746109D01"
  },
  {
    label: "LineDraw2426",
    equation: "X78220722Y-141673803D01"
  },
  {
    label: "LineDraw2427",
    equation: "X78220724Y-141673802D01"
  },
  {
    label: "LineDraw2428",
    equation: "X78226752Y-141671118D01"
  },
  {
    label: "LineDraw2429",
    equation: "X78381253Y-141558866D01"
  },
  {
    label: "LineDraw2430",
    equation: "X78385668Y-141553963D01"
  },
  {
    label: "LineDraw2431",
    equation: "X78390580Y-141549540D01"
  },
  {
    label: "LineDraw2432",
    equation: "X78391705Y-141550789D01"
  },
  {
    label: "LineDraw2433",
    equation: "X78445014Y-141517949D01"
  },
  {
    label: "LineDraw2434",
    equation: "X78478200Y-141513500D01"
  },
  {
    label: "LineDraw2435",
    equation: "X82291233Y-141513500D01"
  },
  {
    label: "LineDraw2436",
    equation: "X82302416Y-141514027D01"
  },
  {
    label: "LineDraw2437",
    equation: "X82309909Y-141515702D01"
  },
  {
    label: "LineDraw2438",
    equation: "X82317835Y-141515453D01"
  },
  {
    label: "LineDraw2439",
    equation: "X82317836Y-141515453D01"
  },
  {
    label: "LineDraw2440",
    equation: "X82377986Y-141513562D01"
  },
  {
    label: "LineDraw2441",
    equation: "X82381945Y-141513500D01"
  },
  {
    label: "LineDraw2442",
    equation: "X82409856Y-141513500D01"
  },
  {
    label: "LineDraw2443",
    equation: "X82413791Y-141513003D01"
  },
  {
    label: "LineDraw2444",
    equation: "X82413856Y-141512995D01"
  },
  {
    label: "LineDraw2445",
    equation: "X82425693Y-141512062D01"
  },
  {
    label: "LineDraw2446",
    equation: "X82457951Y-141511048D01"
  },
  {
    label: "LineDraw2447",
    equation: "X82461970Y-141510922D01"
  },
  {
    label: "LineDraw2448",
    equation: "X82469889Y-141510673D01"
  },
  {
    label: "LineDraw2449",
    equation: "X82489343Y-141505021D01"
  },
  {
    label: "LineDraw2450",
    equation: "X82508700Y-141501013D01"
  },
  {
    label: "LineDraw2451",
    equation: "X82520930Y-141499468D01"
  },
  {
    label: "LineDraw2452",
    equation: "X82520931Y-141499468D01"
  },
  {
    label: "LineDraw2453",
    equation: "X82528797Y-141498474D01"
  },
  {
    label: "LineDraw2454",
    equation: "X82536168Y-141495555D01"
  },
  {
    label: "LineDraw2455",
    equation: "X82536170Y-141495555D01"
  },
  {
    label: "LineDraw2456",
    equation: "X82569912Y-141482196D01"
  },
  {
    label: "LineDraw2457",
    equation: "X82581142Y-141478351D01"
  },
  {
    label: "LineDraw2458",
    equation: "X82615983Y-141468229D01"
  },
  {
    label: "LineDraw2459",
    equation: "X82615984Y-141468229D01"
  },
  {
    label: "LineDraw2460",
    equation: "X82623593Y-141466018D01"
  },
  {
    label: "LineDraw2461",
    equation: "X82630412Y-141461985D01"
  },
  {
    label: "LineDraw2462",
    equation: "X82630417Y-141461983D01"
  },
  {
    label: "LineDraw2463",
    equation: "X82641028Y-141455707D01"
  },
  {
    label: "LineDraw2464",
    equation: "X82658776Y-141447012D01"
  },
  {
    label: "LineDraw2465",
    equation: "X82677617Y-141439552D01"
  },
  {
    label: "LineDraw2466",
    equation: "X82695709Y-141426408D01"
  },
  {
    label: "LineDraw2467",
    equation: "X82713387Y-141413564D01"
  },
  {
    label: "LineDraw2468",
    equation: "X82723307Y-141407048D01"
  },
  {
    label: "LineDraw2469",
    equation: "X82754535Y-141388580D01"
  },
  {
    label: "LineDraw2470",
    equation: "X82754538Y-141388578D01"
  },
  {
    label: "LineDraw2471",
    equation: "X82761362Y-141384542D01"
  },
  {
    label: "LineDraw2472",
    equation: "X82775683Y-141370221D01"
  },
  {
    label: "LineDraw2473",
    equation: "X82790717Y-141357380D01"
  },
  {
    label: "LineDraw2474",
    equation: "X82800694Y-141350131D01"
  },
  {
    label: "LineDraw2475",
    equation: "X82807107Y-141345472D01"
  },
  {
    label: "LineDraw2476",
    equation: "X82835298Y-141311395D01"
  },
  {
    label: "LineDraw2477",
    equation: "X82843288Y-141302616D01"
  },
  {
    label: "LineDraw2478",
    equation: "X85069793Y-139076112D01"
  },
  {
    label: "LineDraw2479",
    equation: "X85132105Y-139042086D01"
  },
  {
    label: "LineDraw2480",
    equation: "X85202921Y-139047151D01"
  },
  {
    label: "LineDraw2481",
    equation: "X85259756Y-139089698D01"
  },
  {
    label: "LineDraw2482",
    equation: "X85266664Y-139099936D01"
  },
  {
    label: "LineDraw2483",
    equation: "X85351732Y-139240401D01"
  },
  {
    label: "LineDraw2484",
    equation: "X85355380Y-139246424D01"
  },
  {
    label: "LineDraw2485",
    equation: "X85360269Y-139251487D01"
  },
  {
    label: "LineDraw2486",
    equation: "X85360270Y-139251488D01"
  },
  {
    label: "LineDraw2487",
    equation: "X85385719Y-139277841D01"
  },
  {
    label: "LineDraw2488",
    equation: "X85481382Y-139376902D01"
  },
  {
    label: "LineDraw2489",
    equation: "X85506305Y-139393211D01"
  },
  {
    label: "LineDraw2490",
    equation: "X85591786Y-139449148D01"
  },
  {
    label: "LineDraw2491",
    equation: "X85633159Y-139476222D01"
  },
  {
    label: "LineDraw2492",
    equation: "X85639763Y-139478678D01"
  },
  {
    label: "LineDraw2493",
    equation: "X85639765Y-139478679D01"
  },
  {
    label: "LineDraw2494",
    equation: "X85796558Y-139536990D01"
  },
  {
    label: "LineDraw2495",
    equation: "X85796560Y-139536990D01"
  },
  {
    label: "LineDraw2496",
    equation: "X85803168Y-139539448D01"
  },
  {
    label: "LineDraw2497",
    equation: "X85886995Y-139550633D01"
  },
  {
    label: "LineDraw2498",
    equation: "X85975980Y-139562507D01"
  },
  {
    label: "LineDraw2499",
    equation: "X85975984Y-139562507D01"
  },
  {
    label: "LineDraw2500",
    equation: "X85982961Y-139563438D01"
  },
  {
    label: "LineDraw2501",
    equation: "X85989972Y-139562800D01"
  },
  {
    label: "LineDraw2502",
    equation: "X85989976Y-139562800D01"
  },
  {
    label: "LineDraw2503",
    equation: "X86148184Y-139548401D01"
  },
  {
    label: "LineDraw2504",
    equation: "X86163600Y-139546998D01"
  },
  {
    label: "LineDraw2505",
    equation: "X86170302Y-139544820D01"
  },
  {
    label: "LineDraw2506",
    equation: "X86170304Y-139544820D01"
  },
  {
    label: "LineDraw2507",
    equation: "X86329409Y-139493124D01"
  },
  {
    label: "LineDraw2508",
    equation: "X86329412Y-139493123D01"
  },
  {
    label: "LineDraw2509",
    equation: "X86336108Y-139490947D01"
  },
  {
    label: "LineDraw2510",
    equation: "X86491912Y-139398069D01"
  },
  {
    label: "LineDraw2511",
    equation: "X86623266Y-139272982D01"
  },
  {
    label: "LineDraw2512",
    equation: "X86723643Y-139121902D01"
  },
  {
    label: "LineDraw2513",
    equation: "X86788055Y-138952338D01"
  },
  {
    label: "LineDraw2514",
    equation: "X86789035Y-138945366D01"
  },
  {
    label: "LineDraw2515",
    equation: "X86812748Y-138776639D01"
  },
  {
    label: "LineDraw2516",
    equation: "X86812748Y-138776636D01"
  },
  {
    label: "LineDraw2517",
    equation: "X86813299Y-138772717D01"
  },
  {
    label: "LineDraw2518",
    equation: "X86813452Y-138761738D01"
  },
  {
    label: "LineDraw2519",
    equation: "X86813561Y-138753962D01"
  },
  {
    label: "LineDraw2520",
    equation: "X86813561Y-138753957D01"
  },
  {
    label: "LineDraw2521",
    equation: "X86813616Y-138750000D01"
  },
  {
    label: "LineDraw2522",
    equation: "X86793397Y-138569745D01"
  },
  {
    label: "LineDraw2523",
    equation: "X86733745Y-138398448D01"
  },
  {
    label: "LineDraw2524",
    equation: "X86714005Y-138366857D01"
  },
  {
    label: "LineDraw2525",
    equation: "X86641359Y-138250598D01"
  },
  {
    label: "LineDraw2526",
    equation: "X86637626Y-138244624D01"
  },
  {
    label: "LineDraw2527",
    equation: "X86632664Y-138239627D01"
  },
  {
    label: "LineDraw2528",
    equation: "X86514778Y-138120915D01"
  },
  {
    label: "LineDraw2529",
    equation: "X86514774Y-138120912D01"
  },
  {
    label: "LineDraw2530",
    equation: "X86509815Y-138115918D01"
  },
  {
    label: "LineDraw2531",
    equation: "X86356666Y-138018727D01"
  },
  {
    label: "LineDraw2532",
    equation: "X86327463Y-138008328D01"
  },
  {
    label: "LineDraw2533",
    equation: "X86192425Y-137960243D01"
  },
  {
    label: "LineDraw2534",
    equation: "X86192420Y-137960242D01"
  },
  {
    label: "LineDraw2535",
    equation: "X86185790Y-137957881D01"
  },
  {
    label: "LineDraw2536",
    equation: "X86178804Y-137957048D01"
  },
  {
    label: "LineDraw2537",
    equation: "X86178800Y-137957047D01"
  },
  {
    label: "LineDraw2538",
    equation: "X86095864Y-137947158D01"
  },
  {
    label: "LineDraw2539",
    equation: "X86030591Y-137919231D01"
  },
  {
    label: "LineDraw2540",
    equation: "X86021688Y-137911139D01"
  },
  {
    label: "LineDraw2541",
    equation: "X85895405Y-137784856D01"
  },
  {
    label: "LineDraw2542",
    equation: "X85861379Y-137722544D01"
  },
  {
    label: "LineDraw2543",
    equation: "X85858500Y-137695761D01"
  },
  {
    label: "LineDraw2544",
    equation: "X85858500Y-135814289D01"
  },
  {
    label: "LineDraw2545",
    equation: "X85878502Y-135746168D01"
  },
  {
    label: "LineDraw2546",
    equation: "X85895405Y-135725194D01"
  },
  {
    label: "LineDraw2547",
    equation: "X86925194Y-134695405D01"
  },
  {
    label: "LineDraw2548",
    equation: "X86987506Y-134661379D01"
  },
  {
    label: "LineDraw2549",
    equation: "X87014289Y-134658500D01"
  },
  {
    label: "LineDraw2550",
    equation: "X87091864Y-134658500D01"
  },
  {
    label: "LineDraw2551",
    equation: "X87108307Y-134659578D01"
  },
  {
    label: "LineDraw2552",
    equation: "X87140000Y-134663750D01"
  },
  {
    label: "LineDraw2553",
    equation: "X87148189Y-134662672D01"
  },
  {
    label: "LineDraw2554",
    equation: "X87179874Y-134658501D01"
  },
  {
    label: "LineDraw2555",
    equation: "X87179884Y-134658500D01"
  },
  {
    label: "LineDraw2556",
    equation: "X87179885Y-134658500D01"
  },
  {
    label: "LineDraw2557",
    equation: "X87193710Y-134656680D01"
  },
  {
    label: "LineDraw2558",
    equation: "X87279457Y-134645391D01"
  },
  {
    label: "LineDraw2559",
    equation: "X87290664Y-134643916D01"
  },
  {
    label: "LineDraw2560",
    equation: "X87290666Y-134643915D01"
  },
  {
    label: "LineDraw2561",
    equation: "X87298851Y-134642838D01"
  },
  {
    label: "LineDraw2562",
    equation: "X87446876Y-134581524D01"
  },
  {
    label: "LineDraw2563",
    equation: "X87476955Y-134558444D01"
  },
  {
    label: "LineDraw2564",
    equation: "X87542072Y-134508477D01"
  },
  {
    label: "LineDraw2565",
    equation: "X87542075Y-134508474D01"
  },
  {
    label: "LineDraw2566",
    equation: "X87567434Y-134489015D01"
  },
  {
    label: "LineDraw2567",
    equation: "X87573987Y-134483987D01"
  },
  {
    label: "LineDraw2568",
    equation: "X87579800Y-134476411D01"
  },
  {
    label: "LineDraw2569",
    equation: "X87593452Y-134458621D01"
  },
  {
    label: "LineDraw2570",
    equation: "X87604319Y-134446230D01"
  },
  {
    label: "LineDraw2571",
    equation: "X91196234Y-130854315D01"
  },
  {
    label: "LineDraw2572",
    equation: "X91208625Y-130843448D01"
  },
  {
    label: "LineDraw2573",
    equation: "X91227437Y-130829013D01"
  },
  {
    label: "LineDraw2574",
    equation: "X91233987Y-130823987D01"
  },
  {
    label: "LineDraw2575",
    equation: "X91258474Y-130792075D01"
  },
  {
    label: "LineDraw2576",
    equation: "X91258478Y-130792071D01"
  },
  {
    label: "LineDraw2577",
    equation: "X91331524Y-130696876D01"
  },
  {
    label: "LineDraw2578",
    equation: "X91392838Y-130548851D01"
  },
  {
    label: "LineDraw2579",
    equation: "X91394258Y-130538069D01"
  },
  {
    label: "LineDraw2580",
    equation: "X91412673Y-130398188D01"
  },
  {
    label: "LineDraw2581",
    equation: "X91413751Y-130390000D01"
  },
  {
    label: "LineDraw2582",
    equation: "X91409578Y-130358301D01"
  },
  {
    label: "LineDraw2583",
    equation: "X91408500Y-130341856D01"
  },
  {
    label: "LineDraw2584",
    equation: "X91408500Y-129514289D01"
  },
  {
    label: "LineDraw2585",
    equation: "X91428502Y-129446168D01"
  },
  {
    label: "LineDraw2586",
    equation: "X91445405Y-129425194D01"
  },
  {
    label: "LineDraw2587",
    equation: "X99176405Y-121694194D01"
  },
  {
    label: "LineDraw2588",
    equation: "X99238717Y-121660168D01"
  },
  {
    label: "LineDraw2589",
    equation: "X99309532Y-121665233D01"
  },
  {
    label: "LineDraw2590",
    equation: "X99366368Y-121707780D01"
  },
  {
    label: "LineDraw2591",
    equation: "X99391179Y-121774300D01"
  },
  {
    label: "LineDraw2592",
    equation: "X99391500Y-121783289D01"
  },
  {
    label: "LineDraw2593",
    equation: "X99391500Y-123691864D01"
  },
  {
    label: "LineDraw2594",
    equation: "X99390422Y-123708307D01"
  },
  {
    label: "LineDraw2595",
    equation: "X99386250Y-123740000D01"
  },
  {
    label: "LineDraw2596",
    equation: "X99391500Y-123779880D01"
  },
  {
    label: "LineDraw2597",
    equation: "X99391500Y-123779885D01"
  },
  {
    label: "LineDraw2598",
    equation: "X99395846Y-123812894D01"
  },
  {
    label: "LineDraw2599",
    equation: "X99407162Y-123898851D01"
  },
  {
    label: "LineDraw2600",
    equation: "X99468476Y-124046876D01"
  },
  {
    label: "LineDraw2601",
    equation: "X99473503Y-124053427D01"
  },
  {
    label: "LineDraw2602",
    equation: "X99473504Y-124053429D01"
  },
  {
    label: "LineDraw2603",
    equation: "X99541520Y-124142069D01"
  },
  {
    label: "LineDraw2604",
    equation: "X99541526Y-124142075D01"
  },
  {
    label: "LineDraw2605",
    equation: "X99566013Y-124173987D01"
  },
  {
    label: "LineDraw2606",
    equation: "X99572568Y-124179017D01"
  },
  {
    label: "LineDraw2607",
    equation: "X99591379Y-124193452D01"
  },
  {
    label: "LineDraw2608",
    equation: "X99603770Y-124204319D01"
  },
  {
    label: "LineDraw2609",
    equation: "X107985026Y-132585575D01"
  },
  {
    label: "LineDraw2610",
    equation: "X108015764Y-132635733D01"
  },
  {
    label: "LineDraw2611",
    equation: "X108050473Y-132742556D01"
  },
  {
    label: "LineDraw2612",
    equation: "X108053776Y-132748278D01"
  },
  {
    label: "LineDraw2613",
    equation: "X108053777Y-132748279D01"
  },
  {
    label: "LineDraw2614",
    equation: "X108058636Y-132756695D01"
  },
  {
    label: "LineDraw2615",
    equation: "X108145960Y-132907944D01"
  },
  {
    label: "LineDraw2616",
    equation: "X108150378Y-132912851D01"
  },
  {
    label: "LineDraw2617",
    equation: "X108150379Y-132912852D01"
  },
  {
    label: "LineDraw2618",
    equation: "X108210583Y-132979715D01"
  },
  {
    label: "LineDraw2619",
    equation: "X108273747Y-133049866D01"
  },
  {
    label: "LineDraw2620",
    equation: "X108428248Y-133162118D01"
  },
  {
    label: "LineDraw2621",
    equation: "X108434276Y-133164802D01"
  },
  {
    label: "LineDraw2622",
    equation: "X108434278Y-133164803D01"
  },
  {
    label: "LineDraw2623",
    equation: "X108596681Y-133237109D01"
  },
  {
    label: "LineDraw2624",
    equation: "X108602712Y-133239794D01"
  },
  {
    label: "LineDraw2625",
    equation: "X108689705Y-133258285D01"
  },
  {
    label: "LineDraw2626",
    equation: "X108783056Y-133278128D01"
  },
  {
    label: "LineDraw2627",
    equation: "X108783061Y-133278128D01"
  },
  {
    label: "LineDraw2628",
    equation: "X108789513Y-133279500D01"
  },
  {
    label: "LineDraw2629",
    equation: "X108980487Y-133279500D01"
  },
  {
    label: "LineDraw2630",
    equation: "X108986939Y-133278128D01"
  },
  {
    label: "LineDraw2631",
    equation: "X108986944Y-133278128D01"
  },
  {
    label: "LineDraw2632",
    equation: "X109080295Y-133258285D01"
  },
  {
    label: "LineDraw2633",
    equation: "X109167288Y-133239794D01"
  },
  {
    label: "LineDraw2634",
    equation: "X109173319Y-133237109D01"
  },
  {
    label: "LineDraw2635",
    equation: "X109335722Y-133164803D01"
  },
  {
    label: "LineDraw2636",
    equation: "X109335724Y-133164802D01"
  },
  {
    label: "LineDraw2637",
    equation: "X109341752Y-133162118D01"
  },
  {
    label: "LineDraw2638",
    equation: "X109496253Y-133049866D01"
  },
  {
    label: "LineDraw2639",
    equation: "X109559417Y-132979715D01"
  },
  {
    label: "LineDraw2640",
    equation: "X109619621Y-132912852D01"
  },
  {
    label: "LineDraw2641",
    equation: "X109619622Y-132912851D01"
  },
  {
    label: "LineDraw2642",
    equation: "X109624040Y-132907944D01"
  },
  {
    label: "LineDraw2643",
    equation: "X109711364Y-132756695D01"
  },
  {
    label: "LineDraw2644",
    equation: "X109716223Y-132748279D01"
  },
  {
    label: "LineDraw2645",
    equation: "X109716224Y-132748278D01"
  },
  {
    label: "LineDraw2646",
    equation: "X109719527Y-132742556D01"
  },
  {
    label: "LineDraw2647",
    equation: "X109778542Y-132560928D01"
  },
  {
    label: "LineDraw2648",
    equation: "X109780773Y-132539707D01"
  },
  {
    label: "LineDraw2649",
    equation: "X109797814Y-132377565D01"
  },
  {
    label: "LineDraw2650",
    equation: "X109798504Y-132371000D01"
  },
  {
    label: "LineDraw2651",
    equation: "X109784471Y-132237481D01"
  },
  {
    label: "LineDraw2652",
    equation: "X109779232Y-132187635D01"
  },
  {
    label: "LineDraw2653",
    equation: "X109779232Y-132187633D01"
  },
  {
    label: "LineDraw2654",
    equation: "X109778542Y-132181072D01"
  },
  {
    label: "LineDraw2655",
    equation: "X109719527Y-131999444D01"
  },
  {
    label: "LineDraw2656",
    equation: "X109624040Y-131834056D01"
  },
  {
    label: "LineDraw2657",
    equation: "X109601807Y-131809363D01"
  },
  {
    label: "LineDraw2658",
    equation: "X109500675Y-131697045D01"
  },
  {
    label: "LineDraw2659",
    equation: "X109500674Y-131697044D01"
  },
  {
    label: "LineDraw2660",
    equation: "X109496253Y-131692134D01"
  },
  {
    label: "LineDraw2661",
    equation: "X109397157Y-131620136D01"
  },
  {
    label: "LineDraw2662",
    equation: "X109347094Y-131583763D01"
  },
  {
    label: "LineDraw2663",
    equation: "X109347093Y-131583762D01"
  },
  {
    label: "LineDraw2664",
    equation: "X109341752Y-131579882D01"
  },
  {
    label: "LineDraw2665",
    equation: "X109335724Y-131577198D01"
  },
  {
    label: "LineDraw2666",
    equation: "X109335722Y-131577197D01"
  },
  {
    label: "LineDraw2667",
    equation: "X109173319Y-131504891D01"
  },
  {
    label: "LineDraw2668",
    equation: "X109173318Y-131504891D01"
  },
  {
    label: "LineDraw2669",
    equation: "X109167288Y-131502206D01"
  },
  {
    label: "LineDraw2670",
    equation: "X109058433Y-131479068D01"
  },
  {
    label: "LineDraw2671",
    equation: "X108986944Y-131463872D01"
  },
  {
    label: "LineDraw2672",
    equation: "X108986939Y-131463872D01"
  },
  {
    label: "LineDraw2673",
    equation: "X108980487Y-131462500D01"
  },
  {
    label: "LineDraw2674",
    equation: "X108789513Y-131462500D01"
  },
  {
    label: "LineDraw2675",
    equation: "X108686159Y-131484469D01"
  },
  {
    label: "LineDraw2676",
    equation: "X108615369Y-131479068D01"
  },
  {
    label: "LineDraw2677",
    equation: "X108570867Y-131450318D01"
  },
  {
    label: "LineDraw2678",
    equation: "X100645405Y-123524856D01"
  },
  {
    label: "LineDraw2679",
    equation: "X100611379Y-123462544D01"
  },
  {
    label: "LineDraw2680",
    equation: "X100608500Y-123435761D01"
  },
  {
    label: "LineDraw2681",
    equation: "X100608500Y-120058186D01"
  },
  {
    label: "LineDraw2682",
    equation: "X100609578Y-120041740D01"
  },
  {
    label: "LineDraw2683",
    equation: "X100612672Y-120018238D01"
  },
  {
    label: "LineDraw2684",
    equation: "X100613750Y-120010050D01"
  },
  {
    label: "LineDraw2685",
    equation: "X100609578Y-119978357D01"
  },
  {
    label: "LineDraw2686",
    equation: "X100608500Y-119961914D01"
  },
  {
    label: "LineDraw2687",
    equation: "X100608500Y-112314835D01"
  },
  {
    label: "LineDraw2688",
    equation: "X100628502Y-112246714D01"
  },
  {
    label: "LineDraw2689",
    equation: "X100682158Y-112200221D01"
  },
  {
    label: "LineDraw2690",
    equation: "X100752432Y-112190117D01"
  },
  {
    label: "LineDraw2691",
    equation: "X100760695Y-112191588D01"
  },
  {
    label: "LineDraw2692",
    equation: "X100782051Y-112196127D01"
  },
  {
    label: "LineDraw2693",
    equation: "X100782056Y-112196128D01"
  },
  {
    label: "LineDraw2694",
    equation: "X100788513Y-112197500D01"
  },
  {
    label: "LineDraw2695",
    equation: "X100979487Y-112197500D01"
  },
  {
    label: "LineDraw2696",
    equation: "X100985939Y-112196128D01"
  },
  {
    label: "LineDraw2697",
    equation: "X100985944Y-112196128D01"
  },
  {
    label: "LineDraw2698",
    equation: "X101081723Y-112175769D01"
  },
  {
    label: "LineDraw2699",
    equation: "X101166288Y-112157794D01"
  },
  {
    label: "LineDraw2700",
    equation: "X101233717Y-112127773D01"
  },
  {
    label: "LineDraw2701",
    equation: "X101334722Y-112082803D01"
  },
  {
    label: "LineDraw2702",
    equation: "X101334724Y-112082802D01"
  },
  {
    label: "LineDraw2703",
    equation: "X101340752Y-112080118D01"
  },
  {
    label: "LineDraw2704",
    equation: "X101495253Y-111967866D01"
  },
  {
    label: "LineDraw2705",
    equation: "X101623040Y-111825944D01"
  },
  {
    label: "LineDraw2706",
    equation: "X101718527Y-111660556D01"
  },
  {
    label: "LineDraw2707",
    equation: "X101777542Y-111478928D01"
  },
  {
    label: "LineDraw2708",
    equation: "X101778497Y-111469848D01"
  },
  {
    label: "LineDraw2709",
    equation: "X101796814Y-111295565D01"
  },
  {
    label: "LineDraw2710",
    equation: "X101797504Y-111289000D01"
  },
  {
    label: "LineDraw2711",
    equation: "X101797316Y-111287214D01"
  },
  {
    label: "LineDraw2712",
    equation: "X101816816Y-111220804D01"
  },
  {
    label: "LineDraw2713",
    equation: "X101833719Y-111199830D01"
  },
  {
    label: "LineDraw2714",
    equation: "X102677234Y-110356315D01"
  },
  {
    label: "LineDraw2715",
    equation: "X102689625Y-110345448D01"
  },
  {
    label: "LineDraw2716",
    equation: "X102708437Y-110331013D01"
  },
  {
    label: "LineDraw2717",
    equation: "X102714987Y-110325987D01"
  },
  {
    label: "LineDraw2718",
    equation: "X102739474Y-110294075D01"
  },
  {
    label: "LineDraw2719",
    equation: "X102739477Y-110294072D01"
  },
  {
    label: "LineDraw2720",
    equation: "X102739481Y-110294066D01"
  },
  {
    label: "LineDraw2721",
    equation: "X102739491Y-110294055D01"
  },
  {
    label: "LineDraw2722",
    equation: "X102803900Y-110210114D01"
  },
  {
    label: "LineDraw2723",
    equation: "X102803902Y-110210111D01"
  },
  {
    label: "LineDraw2724",
    equation: "X102807499Y-110205424D01"
  },
  {
    label: "LineDraw2725",
    equation: "X102807500Y-110205422D01"
  },
  {
    label: "LineDraw2726",
    equation: "X102812524Y-110198875D01"
  },
  {
    label: "LineDraw2727",
    equation: "X102819273Y-110182583D01"
  },
  {
    label: "LineDraw2728",
    equation: "X102870678Y-110058479D01"
  },
  {
    label: "LineDraw2729",
    equation: "X102873838Y-110050850D01"
  },
  {
    label: "LineDraw2730",
    equation: "X102875731Y-110036475D01"
  },
  {
    label: "LineDraw2731",
    equation: "X102889500Y-109931885D01"
  },
  {
    label: "LineDraw2732",
    equation: "X102889500Y-109931878D01"
  },
  {
    label: "LineDraw2733",
    equation: "X102893672Y-109900188D01"
  },
  {
    label: "LineDraw2734",
    equation: "X102894750Y-109892000D01"
  },
  {
    label: "LineDraw2735",
    equation: "X102890578Y-109860307D01"
  },
  {
    label: "LineDraw2736",
    equation: "X102889500Y-109843864D01"
  },
  {
    label: "LineDraw2737",
    equation: "X102889500Y-109029140D01"
  },
  {
    label: "LineDraw2738",
    equation: "X102909502Y-108961019D01"
  },
  {
    label: "LineDraw2739",
    equation: "X102926405Y-108940045D01"
  },
  {
    label: "LineDraw2740",
    equation: "X102927437Y-108939013D01"
  },
  {
    label: "LineDraw2741",
    equation: "X102933987Y-108933987D01"
  },
  {
    label: "LineDraw2742",
    equation: "X102958474Y-108902075D01"
  },
  {
    label: "LineDraw2743",
    equation: "X102958478Y-108902071D01"
  },
  {
    label: "LineDraw2744",
    equation: "X103031524Y-108806876D01"
  },
  {
    label: "LineDraw2745",
    equation: "X103092838Y-108658851D01"
  },
  {
    label: "LineDraw2746",
    equation: "X103097185Y-108625834D01"
  },
  {
    label: "LineDraw2747",
    equation: "X103108500Y-108539885D01"
  },
  {
    label: "LineDraw2748",
    equation: "X103108500Y-108539880D01"
  },
  {
    label: "LineDraw2749",
    equation: "X103113750Y-108500000D01"
  },
  {
    label: "LineDraw2750",
    equation: "X103109578Y-108468307D01"
  },
  {
    label: "LineDraw2751",
    equation: "X103108500Y-108451864D01"
  },
  {
    label: "LineDraw2752",
    equation: "X103108500Y-103798136D01"
  },
  {
    label: "LineDraw2753",
    equation: "X103109578Y-103781690D01"
  },
  {
    label: "LineDraw2754",
    equation: "X103112672Y-103758188D01"
  },
  {
    label: "LineDraw2755",
    equation: "X103113750Y-103750000D01"
  },
  {
    label: "LineDraw2756",
    equation: "X103108500Y-103710122D01"
  },
  {
    label: "LineDraw2757",
    equation: "X103108500Y-103710115D01"
  },
  {
    label: "LineDraw2758",
    equation: "X103092838Y-103591150D01"
  },
  {
    label: "LineDraw2759",
    equation: "X103031524Y-103443125D01"
  },
  {
    label: "LineDraw2760",
    equation: "X103004461Y-103407856D01"
  },
  {
    label: "LineDraw2761",
    equation: "X102958477Y-103347928D01"
  },
  {
    label: "LineDraw2762",
    equation: "X102958474Y-103347925D01"
  },
  {
    label: "LineDraw2763",
    equation: "X102933987Y-103316013D01"
  },
  {
    label: "LineDraw2764",
    equation: "X102927432Y-103310983D01"
  },
  {
    label: "LineDraw2765",
    equation: "X102908621Y-103296548D01"
  },
  {
    label: "LineDraw2766",
    equation: "X102896230Y-103285681D01"
  },
  {
    label: "LineDraw2767",
    equation: "X100588888Y-100978339D01"
  },
  {
    label: "LineDraw2768",
    equation: "X100554862Y-100916027D01"
  },
  {
    label: "LineDraw2769",
    equation: "X100552768Y-100903289D01"
  },
  {
    label: "LineDraw2770",
    equation: "X100544182Y-100826744D01"
  },
  {
    label: "LineDraw2771",
    equation: "X100543397Y-100819745D01"
  },
  {
    label: "LineDraw2772",
    equation: "X100540412Y-100811173D01"
  },
  {
    label: "LineDraw2773",
    equation: "X100486064Y-100655106D01"
  },
  {
    label: "LineDraw2774",
    equation: "X100486062Y-100655103D01"
  },
  {
    label: "LineDraw2775",
    equation: "X100483745Y-100648448D01"
  },
  {
    label: "LineDraw2776",
    equation: "X100387626Y-100494624D01"
  },
  {
    label: "LineDraw2777",
    equation: "X100360629Y-100467438D01"
  },
  {
    label: "LineDraw2778",
    equation: "X100264778Y-100370915D01"
  },
  {
    label: "LineDraw2779",
    equation: "X100264774Y-100370912D01"
  },
  {
    label: "LineDraw2780",
    equation: "X100259815Y-100365918D01"
  },
  {
    label: "LineDraw2781",
    equation: "X100248697Y-100358862D01"
  },
  {
    label: "LineDraw2782",
    equation: "X100118840Y-100276453D01"
  },
  {
    label: "LineDraw2783",
    equation: "X100106666Y-100268727D01"
  },
  {
    label: "LineDraw2784",
    equation: "X100075642Y-100257680D01"
  },
  {
    label: "LineDraw2785",
    equation: "X99942425Y-100210243D01"
  },
  {
    label: "LineDraw2786",
    equation: "X99942420Y-100210242D01"
  },
  {
    label: "LineDraw2787",
    equation: "X99935790Y-100207881D01"
  },
  {
    label: "LineDraw2788",
    equation: "X99928802Y-100207048D01"
  },
  {
    label: "LineDraw2789",
    equation: "X99928799Y-100207047D01"
  },
  {
    label: "LineDraw2790",
    equation: "X99805698Y-100192368D01"
  },
  {
    label: "LineDraw2791",
    equation: "X99755680Y-100186404D01"
  },
  {
    label: "LineDraw2792",
    equation: "X99748677Y-100187140D01"
  },
  {
    label: "LineDraw2793",
    equation: "X99748676Y-100187140D01"
  },
  {
    label: "LineDraw2794",
    equation: "X99582288Y-100204628D01"
  },
  {
    label: "LineDraw2795",
    equation: "X99582286Y-100204629D01"
  },
  {
    label: "LineDraw2796",
    equation: "X99575288Y-100205364D01"
  },
  {
    label: "LineDraw2797",
    equation: "X99403579Y-100263818D01"
  },
  {
    label: "LineDraw2798",
    equation: "X99341109Y-100302250D01"
  },
  {
    label: "LineDraw2799",
    equation: "X99255095Y-100355166D01"
  },
  {
    label: "LineDraw2800",
    equation: "X99255092Y-100355168D01"
  },
  {
    label: "LineDraw2801",
    equation: "X99249088Y-100358862D01"
  },
  {
    label: "LineDraw2802",
    equation: "X99244053Y-100363793D01"
  },
  {
    label: "LineDraw2803",
    equation: "X99244050Y-100363795D01"
  },
  {
    label: "LineDraw2804",
    equation: "X99124525Y-100480843D01"
  },
  {
    label: "LineDraw2805",
    equation: "X99119493Y-100485771D01"
  },
  {
    label: "LineDraw2806",
    equation: "X99021235Y-100638238D01"
  },
  {
    label: "LineDraw2807",
    equation: "X99018826Y-100644858D01"
  },
  {
    label: "LineDraw2808",
    equation: "X99018824Y-100644861D01"
  },
  {
    label: "LineDraw2809",
    equation: "X99014356Y-100657137D01"
  },
  {
    label: "LineDraw2810",
    equation: "X98959197Y-100808685D01"
  },
  {
    label: "LineDraw2811",
    equation: "X98936463Y-100988640D01"
  },
  {
    label: "LineDraw2812",
    equation: "X98954163Y-101169160D01"
  },
  {
    label: "LineDraw2813",
    equation: "X99011418Y-101341273D01"
  },
  {
    label: "LineDraw2814",
    equation: "X99015065Y-101347295D01"
  },
  {
    label: "LineDraw2815",
    equation: "X99015066Y-101347297D01"
  },
  {
    label: "LineDraw2816",
    equation: "X99078560Y-101452138D01"
  },
  {
    label: "LineDraw2817",
    equation: "X99105380Y-101496424D01"
  },
  {
    label: "LineDraw2818",
    equation: "X99231382Y-101626902D01"
  },
  {
    label: "LineDraw2819",
    equation: "X99383159Y-101726222D01"
  },
  {
    label: "LineDraw2820",
    equation: "X99389763Y-101728678D01"
  },
  {
    label: "LineDraw2821",
    equation: "X99389765Y-101728679D01"
  },
  {
    label: "LineDraw2822",
    equation: "X99546558Y-101786990D01"
  },
  {
    label: "LineDraw2823",
    equation: "X99546560Y-101786990D01"
  },
  {
    label: "LineDraw2824",
    equation: "X99553168Y-101789448D01"
  },
  {
    label: "LineDraw2825",
    equation: "X99560153Y-101790380D01"
  },
  {
    label: "LineDraw2826",
    equation: "X99560157Y-101790381D01"
  },
  {
    label: "LineDraw2827",
    equation: "X99622547Y-101798706D01"
  },
  {
    label: "LineDraw2828",
    equation: "X99655986Y-101803167D01"
  },
  {
    label: "LineDraw2829",
    equation: "X99720862Y-101832003D01"
  },
  {
    label: "LineDraw2830",
    equation: "X99728416Y-101838965D01"
  },
  {
    label: "LineDraw2831",
    equation: "X101854595Y-103965144D01"
  },
  {
    label: "LineDraw2832",
    equation: "X101888621Y-104027456D01"
  },
  {
    label: "LineDraw2833",
    equation: "X101891500Y-104054239D01"
  },
  {
    label: "LineDraw2834",
    equation: "X101891500Y-108189860D01"
  },
  {
    label: "LineDraw2835",
    equation: "X101871498Y-108257981D01"
  },
  {
    label: "LineDraw2836",
    equation: "X101854595Y-108278955D01"
  },
  {
    label: "LineDraw2837",
    equation: "X101853563Y-108279987D01"
  },
  {
    label: "LineDraw2838",
    equation: "X101847013Y-108285013D01"
  },
  {
    label: "LineDraw2839",
    equation: "X101822526Y-108316925D01"
  },
  {
    label: "LineDraw2840",
    equation: "X101822523Y-108316928D01"
  },
  {
    label: "LineDraw2841",
    equation: "X101822517Y-108316936D01"
  },
  {
    label: "LineDraw2842",
    equation: "X101773306Y-108381069D01"
  },
  {
    label: "LineDraw2843",
    equation: "X101749476Y-108412124D01"
  },
  {
    label: "LineDraw2844",
    equation: "X101688162Y-108560149D01"
  },
  {
    label: "LineDraw2845",
    equation: "X101686484Y-108572894D01"
  },
  {
    label: "LineDraw2846",
    equation: "X101672500Y-108679115D01"
  },
  {
    label: "LineDraw2847",
    equation: "X101672500Y-108679120D01"
  },
  {
    label: "LineDraw2848",
    equation: "X101667250Y-108719000D01"
  },
  {
    label: "LineDraw2849",
    equation: "X101668328Y-108727188D01"
  },
  {
    label: "LineDraw2850",
    equation: "X101671422Y-108750690D01"
  },
  {
    label: "LineDraw2851",
    equation: "X101672500Y-108767136D01"
  },
  {
    label: "LineDraw2852",
    equation: "X101672500Y-109587761D01"
  },
  {
    label: "LineDraw2853",
    equation: "X101652498Y-109655882D01"
  },
  {
    label: "LineDraw2854",
    equation: "X101635595Y-109676856D01"
  },
  {
    label: "LineDraw2855",
    equation: "X100968856Y-110343595D01"
  },
  {
    label: "LineDraw2856",
    equation: "X100906544Y-110377621D01"
  },
  {
    label: "LineDraw2857",
    equation: "X100879761Y-110380500D01"
  },
  {
    label: "LineDraw2858",
    equation: "X100788513Y-110380500D01"
  },
  {
    label: "LineDraw2859",
    equation: "X100788513Y-110377970D01"
  },
  {
    label: "LineDraw2860",
    equation: "X100729864Y-110367235D01"
  },
  {
    label: "LineDraw2861",
    equation: "X100678025Y-110318724D01"
  },
  {
    label: "LineDraw2862",
    equation: "X100660642Y-110249889D01"
  },
  {
    label: "LineDraw2863",
    equation: "X100683234Y-110182583D01"
  },
  {
    label: "LineDraw2864",
    equation: "X100692904Y-110170408D01"
  },
  {
    label: "LineDraw2865",
    equation: "X100817912Y-110031572D01"
  },
  {
    label: "LineDraw2866",
    equation: "X100893767Y-109900188D01"
  },
  {
    label: "LineDraw2867",
    equation: "X100910095Y-109871907D01"
  },
  {
    label: "LineDraw2868",
    equation: "X100910096Y-109871906D01"
  },
  {
    label: "LineDraw2869",
    equation: "X100913399Y-109866184D01"
  },
  {
    label: "LineDraw2870",
    equation: "X100972414Y-109684556D01"
  },
  {
    label: "LineDraw2871",
    equation: "X100973224Y-109676856D01"
  },
  {
    label: "LineDraw2872",
    equation: "X100991686Y-109501193D01"
  },
  {
    label: "LineDraw2873",
    equation: "X100992376Y-109494628D01"
  },
  {
    label: "LineDraw2874",
    equation: "X100984443Y-109419151D01"
  },
  {
    label: "LineDraw2875",
    equation: "X100973104Y-109311263D01"
  },
  {
    label: "LineDraw2876",
    equation: "X100973104Y-109311261D01"
  },
  {
    label: "LineDraw2877",
    equation: "X100972414Y-109304700D01"
  },
  {
    label: "LineDraw2878",
    equation: "X100913399Y-109123072D01"
  },
  {
    label: "LineDraw2879",
    equation: "X100817912Y-108957684D01"
  },
  {
    label: "LineDraw2880",
    equation: "X100795733Y-108933051D01"
  },
  {
    label: "LineDraw2881",
    equation: "X100694547Y-108820673D01"
  },
  {
    label: "LineDraw2882",
    equation: "X100694546Y-108820672D01"
  },
  {
    label: "LineDraw2883",
    equation: "X100690125Y-108815762D01"
  },
  {
    label: "LineDraw2884",
    equation: "X100535624Y-108703510D01"
  },
  {
    label: "LineDraw2885",
    equation: "X100529596Y-108700826D01"
  },
  {
    label: "LineDraw2886",
    equation: "X100529594Y-108700825D01"
  },
  {
    label: "LineDraw2887",
    equation: "X100367191Y-108628519D01"
  },
  {
    label: "LineDraw2888",
    equation: "X100367190Y-108628519D01"
  },
  {
    label: "LineDraw2889",
    equation: "X100361160Y-108625834D01"
  },
  {
    label: "LineDraw2890",
    equation: "X100244862Y-108601114D01"
  },
  {
    label: "LineDraw2891",
    equation: "X100176120Y-108586502D01"
  },
  {
    label: "LineDraw2892",
    equation: "X100113646Y-108552773D01"
  },
  {
    label: "LineDraw2893",
    equation: "X100079325Y-108490624D01"
  },
  {
    label: "LineDraw2894",
    equation: "X100084053Y-108419785D01"
  },
  {
    label: "LineDraw2895",
    equation: "X100115423Y-108372011D01"
  },
  {
    label: "LineDraw2896",
    equation: "X100237266Y-108255982D01"
  },
  {
    label: "LineDraw2897",
    equation: "X100337643Y-108104902D01"
  },
  {
    label: "LineDraw2898",
    equation: "X100402055Y-107935338D01"
  },
  {
    label: "LineDraw2899",
    equation: "X100403035Y-107928366D01"
  },
  {
    label: "LineDraw2900",
    equation: "X100426748Y-107759639D01"
  },
  {
    label: "LineDraw2901",
    equation: "X100426748Y-107759636D01"
  },
  {
    label: "LineDraw2902",
    equation: "X100427299Y-107755717D01"
  },
  {
    label: "LineDraw2903",
    equation: "X100427616Y-107733000D01"
  },
  {
    label: "LineDraw2904",
    equation: "X100407397Y-107552745D01"
  },
  {
    label: "LineDraw2905",
    equation: "X100405080Y-107546091D01"
  },
  {
    label: "LineDraw2906",
    equation: "X100350064Y-107388106D01"
  },
  {
    label: "LineDraw2907",
    equation: "X100350062Y-107388103D01"
  },
  {
    label: "LineDraw2908",
    equation: "X100347745Y-107381448D01"
  },
  {
    label: "LineDraw2909",
    equation: "X100312872Y-107325639D01"
  },
  {
    label: "LineDraw2910",
    equation: "X100293736Y-107257270D01"
  },
  {
    label: "LineDraw2911",
    equation: "X100314602Y-107189409D01"
  },
  {
    label: "LineDraw2912",
    equation: "X100368843Y-107143601D01"
  },
  {
    label: "LineDraw2913",
    equation: "X100398846Y-107135836D01"
  },
  {
    label: "LineDraw2914",
    equation: "X100398685Y-107135052D01"
  },
  {
    label: "LineDraw2915",
    equation: "X100405579Y-107133637D01"
  },
  {
    label: "LineDraw2916",
    equation: "X100412600Y-107132998D01"
  },
  {
    label: "LineDraw2917",
    equation: "X100419302Y-107130820D01"
  },
  {
    label: "LineDraw2918",
    equation: "X100419304Y-107130820D01"
  },
  {
    label: "LineDraw2919",
    equation: "X100578409Y-107079124D01"
  },
  {
    label: "LineDraw2920",
    equation: "X100578412Y-107079123D01"
  },
  {
    label: "LineDraw2921",
    equation: "X100585108Y-107076947D01"
  },
  {
    label: "LineDraw2922",
    equation: "X100740912Y-106984069D01"
  },
  {
    label: "LineDraw2923",
    equation: "X100872266Y-106858982D01"
  },
  {
    label: "LineDraw2924",
    equation: "X100972643Y-106707902D01"
  },
  {
    label: "LineDraw2925",
    equation: "X101014423Y-106597917D01"
  },
  {
    label: "LineDraw2926",
    equation: "X101034555Y-106544920D01"
  },
  {
    label: "LineDraw2927",
    equation: "X101034556Y-106544918D01"
  },
  {
    label: "LineDraw2928",
    equation: "X101037055Y-106538338D01"
  },
  {
    label: "LineDraw2929",
    equation: "X101039976Y-106517552D01"
  },
  {
    label: "LineDraw2930",
    equation: "X101061748Y-106362639D01"
  },
  {
    label: "LineDraw2931",
    equation: "X101061748Y-106362636D01"
  },
  {
    label: "LineDraw2932",
    equation: "X101062299Y-106358717D01"
  },
  {
    label: "LineDraw2933",
    equation: "X101062616Y-106336000D01"
  },
  {
    label: "LineDraw2934",
    equation: "X101042397Y-106155745D01"
  },
  {
    label: "LineDraw2935",
    equation: "X101039226Y-106146638D01"
  },
  {
    label: "LineDraw2936",
    equation: "X100985064Y-105991106D01"
  },
  {
    label: "LineDraw2937",
    equation: "X100985062Y-105991103D01"
  },
  {
    label: "LineDraw2938",
    equation: "X100982745Y-105984448D01"
  },
  {
    label: "LineDraw2939",
    equation: "X100886626Y-105830624D01"
  },
  {
    label: "LineDraw2940",
    equation: "X100881664Y-105825627D01"
  },
  {
    label: "LineDraw2941",
    equation: "X100763778Y-105706915D01"
  },
  {
    label: "LineDraw2942",
    equation: "X100763774Y-105706912D01"
  },
  {
    label: "LineDraw2943",
    equation: "X100758815Y-105701918D01"
  },
  {
    label: "LineDraw2944",
    equation: "X100747697Y-105694862D01"
  },
  {
    label: "LineDraw2945",
    equation: "X100678089Y-105650688D01"
  },
  {
    label: "LineDraw2946",
    equation: "X100605666Y-105604727D01"
  },
  {
    label: "LineDraw2947",
    equation: "X100576463Y-105594328D01"
  },
  {
    label: "LineDraw2948",
    equation: "X100441425Y-105546243D01"
  },
  {
    label: "LineDraw2949",
    equation: "X100441420Y-105546242D01"
  },
  {
    label: "LineDraw2950",
    equation: "X100434790Y-105543881D01"
  },
  {
    label: "LineDraw2951",
    equation: "X100427802Y-105543048D01"
  },
  {
    label: "LineDraw2952",
    equation: "X100427799Y-105543047D01"
  },
  {
    label: "LineDraw2953",
    equation: "X100304698Y-105528368D01"
  },
  {
    label: "LineDraw2954",
    equation: "X100254680Y-105522404D01"
  },
  {
    label: "LineDraw2955",
    equation: "X100247677Y-105523140D01"
  },
  {
    label: "LineDraw2956",
    equation: "X100247676Y-105523140D01"
  },
  {
    label: "LineDraw2957",
    equation: "X100081288Y-105540628D01"
  },
  {
    label: "LineDraw2958",
    equation: "X100081286Y-105540629D01"
  },
  {
    label: "LineDraw2959",
    equation: "X100074288Y-105541364D01"
  },
  {
    label: "LineDraw2960",
    equation: "X99902579Y-105599818D01"
  },
  {
    label: "LineDraw2961",
    equation: "X99896575Y-105603512D01"
  },
  {
    label: "LineDraw2962",
    equation: "X99754095Y-105691166D01"
  },
  {
    label: "LineDraw2963",
    equation: "X99754092Y-105691168D01"
  },
  {
    label: "LineDraw2964",
    equation: "X99748088Y-105694862D01"
  },
  {
    label: "LineDraw2965",
    equation: "X99743053Y-105699793D01"
  },
  {
    label: "LineDraw2966",
    equation: "X99743050Y-105699795D01"
  },
  {
    label: "LineDraw2967",
    equation: "X99712929Y-105729292D01"
  },
  {
    label: "LineDraw2968",
    equation: "X99618493Y-105821771D01"
  },
  {
    label: "LineDraw2969",
    equation: "X99520235Y-105974238D01"
  },
  {
    label: "LineDraw2970",
    equation: "X99517826Y-105980858D01"
  },
  {
    label: "LineDraw2971",
    equation: "X99517824Y-105980861D01"
  },
  {
    label: "LineDraw2972",
    equation: "X99463215Y-106130897D01"
  },
  {
    label: "LineDraw2973",
    equation: "X99458197Y-106144685D01"
  },
  {
    label: "LineDraw2974",
    equation: "X99447416Y-106230027D01"
  },
  {
    label: "LineDraw2975",
    equation: "X99446025Y-106241034D01"
  },
  {
    label: "LineDraw2976",
    equation: "X99417643Y-106306111D01"
  },
  {
    label: "LineDraw2977",
    equation: "X99410114Y-106314337D01"
  },
  {
    label: "LineDraw2978",
    equation: "X99217766Y-106506685D01"
  },
  {
    label: "LineDraw2979",
    equation: "X99205375Y-106517552D01"
  },
  {
    label: "LineDraw2980",
    equation: "X99180013Y-106537013D01"
  },
  {
    label: "LineDraw2981",
    equation: "X99155526Y-106568925D01"
  },
  {
    label: "LineDraw2982",
    equation: "X99155523Y-106568928D01"
  },
  {
    label: "LineDraw2983",
    equation: "X99082476Y-106664124D01"
  },
  {
    label: "LineDraw2984",
    equation: "X99021162Y-106812149D01"
  },
  {
    label: "LineDraw2985",
    equation: "X99021162Y-106812150D01"
  },
  {
    label: "LineDraw2986",
    equation: "X99005500Y-106931115D01"
  },
  {
    label: "LineDraw2987",
    equation: "X99005500Y-106931120D01"
  },
  {
    label: "LineDraw2988",
    equation: "X99000250Y-106971000D01"
  },
  {
    label: "LineDraw2989",
    equation: "X99003604Y-106996473D01"
  },
  {
    label: "LineDraw2990",
    equation: "X99004422Y-107002690D01"
  },
  {
    label: "LineDraw2991",
    equation: "X99005500Y-107019136D01"
  },
  {
    label: "LineDraw2992",
    equation: "X99005500Y-107148164D01"
  },
  {
    label: "LineDraw2993",
    equation: "X98985498Y-107216285D01"
  },
  {
    label: "LineDraw2994",
    equation: "X98984188Y-107218090D01"
  },
  {
    label: "LineDraw2995",
    equation: "X98983493Y-107218771D01"
  },
  {
    label: "LineDraw2996",
    equation: "X98981894Y-107221253D01"
  },
  {
    label: "LineDraw2997",
    equation: "X98981892Y-107221255D01"
  },
  {
    label: "LineDraw2998",
    equation: "X98958682Y-107257270D01"
  },
  {
    label: "LineDraw2999",
    equation: "X98885235Y-107371238D01"
  },
  {
    label: "LineDraw3000",
    equation: "X98882826Y-107377858D01"
  },
  {
    label: "LineDraw3001",
    equation: "X98882824Y-107377861D01"
  },
  {
    label: "LineDraw3002",
    equation: "X98825606Y-107535066D01"
  },
  {
    label: "LineDraw3003",
    equation: "X98823197Y-107541685D01"
  },
  {
    label: "LineDraw3004",
    equation: "X98800463Y-107721640D01"
  },
  {
    label: "LineDraw3005",
    equation: "X98818163Y-107902160D01"
  },
  {
    label: "LineDraw3006",
    equation: "X98875418Y-108074273D01"
  },
  {
    label: "LineDraw3007",
    equation: "X98879065Y-108080295D01"
  },
  {
    label: "LineDraw3008",
    equation: "X98879066Y-108080297D01"
  },
  {
    label: "LineDraw3009",
    equation: "X98950949Y-108198990D01"
  },
  {
    label: "LineDraw3010",
    equation: "X98969380Y-108229424D01"
  },
  {
    label: "LineDraw3011",
    equation: "X99095382Y-108359902D01"
  },
  {
    label: "LineDraw3012",
    equation: "X99127729Y-108381069D01"
  },
  {
    label: "LineDraw3013",
    equation: "X99235915Y-108451864D01"
  },
  {
    label: "LineDraw3014",
    equation: "X99247159Y-108459222D01"
  },
  {
    label: "LineDraw3015",
    equation: "X99253763Y-108461678D01"
  },
  {
    label: "LineDraw3016",
    equation: "X99253765Y-108461679D01"
  },
  {
    label: "LineDraw3017",
    equation: "X99410558Y-108519990D01"
  },
  {
    label: "LineDraw3018",
    equation: "X99410560Y-108519990D01"
  },
  {
    label: "LineDraw3019",
    equation: "X99417168Y-108522448D01"
  },
  {
    label: "LineDraw3020",
    equation: "X99463119Y-108528579D01"
  },
  {
    label: "LineDraw3021",
    equation: "X99488611Y-108531981D01"
  },
  {
    label: "LineDraw3022",
    equation: "X99553488Y-108560817D01"
  },
  {
    label: "LineDraw3023",
    equation: "X99592476Y-108620151D01"
  },
  {
    label: "LineDraw3024",
    equation: "X99593196Y-108691144D01"
  },
  {
    label: "LineDraw3025",
    equation: "X99555421Y-108751256D01"
  },
  {
    label: "LineDraw3026",
    equation: "X99546013Y-108758805D01"
  },
  {
    label: "LineDraw3027",
    equation: "X99467619Y-108815762D01"
  },
  {
    label: "LineDraw3028",
    equation: "X99463198Y-108820672D01"
  },
  {
    label: "LineDraw3029",
    equation: "X99463197Y-108820673D01"
  },
  {
    label: "LineDraw3030",
    equation: "X99362012Y-108933051D01"
  },
  {
    label: "LineDraw3031",
    equation: "X99339832Y-108957684D01"
  },
  {
    label: "LineDraw3032",
    equation: "X99244345Y-109123072D01"
  },
  {
    label: "LineDraw3033",
    equation: "X99185330Y-109304700D01"
  },
  {
    label: "LineDraw3034",
    equation: "X99184640Y-109311261D01"
  },
  {
    label: "LineDraw3035",
    equation: "X99184640Y-109311263D01"
  },
  {
    label: "LineDraw3036",
    equation: "X99173301Y-109419151D01"
  },
  {
    label: "LineDraw3037",
    equation: "X99165368Y-109494628D01"
  },
  {
    label: "LineDraw3038",
    equation: "X99166058Y-109501193D01"
  },
  {
    label: "LineDraw3039",
    equation: "X99184521Y-109676856D01"
  },
  {
    label: "LineDraw3040",
    equation: "X99185330Y-109684556D01"
  },
  {
    label: "LineDraw3041",
    equation: "X99244345Y-109866184D01"
  },
  {
    label: "LineDraw3042",
    equation: "X99247648Y-109871906D01"
  },
  {
    label: "LineDraw3043",
    equation: "X99247649Y-109871907D01"
  },
  {
    label: "LineDraw3044",
    equation: "X99317701Y-109993240D01"
  },
  {
    label: "LineDraw3045",
    equation: "X99339832Y-110031572D01"
  },
  {
    label: "LineDraw3046",
    equation: "X99344247Y-110036475D01"
  },
  {
    label: "LineDraw3047",
    equation: "X99344251Y-110036480D01"
  },
  {
    label: "LineDraw3048",
    equation: "X99359136Y-110053011D01"
  },
  {
    label: "LineDraw3049",
    equation: "X99389853Y-110117018D01"
  },
  {
    label: "LineDraw3050",
    equation: "X99391500Y-110137322D01"
  },
  {
    label: "LineDraw3051",
    equation: "X99391500Y-110296664D01"
  },
  {
    label: "LineDraw3052",
    equation: "X99371498Y-110364785D01"
  },
  {
    label: "LineDraw3053",
    equation: "X99317842Y-110411278D01"
  },
  {
    label: "LineDraw3054",
    equation: "X99262945Y-110419508D01"
  },
  {
    label: "LineDraw3055",
    equation: "X99262945Y-110422328D01"
  },
  {
    label: "LineDraw3056",
    equation: "X99254689Y-110422328D01"
  },
  {
    label: "LineDraw3057",
    equation: "X99246500Y-110421250D01"
  },
  {
    label: "LineDraw3058",
    equation: "X99214807Y-110425422D01"
  },
  {
    label: "LineDraw3059",
    equation: "X99198364Y-110426500D01"
  },
  {
    label: "LineDraw3060",
    equation: "X99055751Y-110426500D01"
  },
  {
    label: "LineDraw3061",
    equation: "X98987630Y-110406498D01"
  },
  {
    label: "LineDraw3062",
    equation: "X98983157Y-110403276D01"
  },
  {
    label: "LineDraw3063",
    equation: "X98980815Y-110400918D01"
  },
  {
    label: "LineDraw3064",
    equation: "X98948642Y-110380500D01"
  },
  {
    label: "LineDraw3065",
    equation: "X98862742Y-110325987D01"
  },
  {
    label: "LineDraw3066",
    equation: "X98827666Y-110303727D01"
  },
  {
    label: "LineDraw3067",
    equation: "X98764976Y-110281404D01"
  },
  {
    label: "LineDraw3068",
    equation: "X98663425Y-110245243D01"
  },
  {
    label: "LineDraw3069",
    equation: "X98663420Y-110245242D01"
  },
  {
    label: "LineDraw3070",
    equation: "X98656790Y-110242881D01"
  },
  {
    label: "LineDraw3071",
    equation: "X98649802Y-110242048D01"
  },
  {
    label: "LineDraw3072",
    equation: "X98649799Y-110242047D01"
  },
  {
    label: "LineDraw3073",
    equation: "X98483669Y-110222237D01"
  },
  {
    label: "LineDraw3074",
    equation: "X98483666Y-110222237D01"
  },
  {
    label: "LineDraw3075",
    equation: "X98476680Y-110221404D01"
  },
  {
    label: "LineDraw3076",
    equation: "X98476825Y-110220192D01"
  },
  {
    label: "LineDraw3077",
    equation: "X98415634Y-110201756D01"
  },
  {
    label: "LineDraw3078",
    equation: "X98369521Y-110147774D01"
  },
  {
    label: "LineDraw3079",
    equation: "X98358500Y-110096240D01"
  },
  {
    label: "LineDraw3080",
    equation: "X98358500Y-109727136D01"
  },
  {
    label: "LineDraw3081",
    equation: "X98359578Y-109710690D01"
  },
  {
    label: "LineDraw3082",
    equation: "X98360170Y-109706197D01"
  },
  {
    label: "LineDraw3083",
    equation: "X98363750Y-109679000D01"
  },
  {
    label: "LineDraw3084",
    equation: "X98358500Y-109639120D01"
  },
  {
    label: "LineDraw3085",
    equation: "X98358500Y-109639115D01"
  },
  {
    label: "LineDraw3086",
    equation: "X98352243Y-109591590D01"
  },
  {
    label: "LineDraw3087",
    equation: "X98343916Y-109528336D01"
  },
  {
    label: "LineDraw3088",
    equation: "X98343915Y-109528334D01"
  },
  {
    label: "LineDraw3089",
    equation: "X98342838Y-109520150D01"
  },
  {
    label: "LineDraw3090",
    equation: "X98338458Y-109509575D01"
  },
  {
    label: "LineDraw3091",
    equation: "X98281524Y-109372124D01"
  },
  {
    label: "LineDraw3092",
    equation: "X98208477Y-109276928D01"
  },
  {
    label: "LineDraw3093",
    equation: "X98208474Y-109276925D01"
  },
  {
    label: "LineDraw3094",
    equation: "X98183987Y-109245013D01"
  },
  {
    label: "LineDraw3095",
    equation: "X98177435Y-109239986D01"
  },
  {
    label: "LineDraw3096",
    equation: "X98171595Y-109234145D01"
  },
  {
    label: "LineDraw3097",
    equation: "X98172825Y-109232915D01"
  },
  {
    label: "LineDraw3098",
    equation: "X98136822Y-109183610D01"
  },
  {
    label: "LineDraw3099",
    equation: "X98130178Y-109155030D01"
  },
  {
    label: "LineDraw3100",
    equation: "X98122182Y-109083744D01"
  },
  {
    label: "LineDraw3101",
    equation: "X98121397Y-109076745D01"
  },
  {
    label: "LineDraw3102",
    equation: "X98118491Y-109068401D01"
  },
  {
    label: "LineDraw3103",
    equation: "X98064064Y-108912106D01"
  },
  {
    label: "LineDraw3104",
    equation: "X98064062Y-108912103D01"
  },
  {
    label: "LineDraw3105",
    equation: "X98061745Y-108905448D01"
  },
  {
    label: "LineDraw3106",
    equation: "X98008772Y-108820673D01"
  },
  {
    label: "LineDraw3107",
    equation: "X97969359Y-108757598D01"
  },
  {
    label: "LineDraw3108",
    equation: "X97965626Y-108751624D01"
  },
  {
    label: "LineDraw3109",
    equation: "X97941360Y-108727188D01"
  },
  {
    label: "LineDraw3110",
    equation: "X97842778Y-108627915D01"
  },
  {
    label: "LineDraw3111",
    equation: "X97842774Y-108627912D01"
  },
  {
    label: "LineDraw3112",
    equation: "X97837815Y-108622918D01"
  },
  {
    label: "LineDraw3113",
    equation: "X97826697Y-108615862D01"
  },
  {
    label: "LineDraw3114",
    equation: "X97760417Y-108573800D01"
  },
  {
    label: "LineDraw3115",
    equation: "X97684666Y-108525727D01"
  },
  {
    label: "LineDraw3116",
    equation: "X97638371Y-108509242D01"
  },
  {
    label: "LineDraw3117",
    equation: "X97520425Y-108467243D01"
  },
  {
    label: "LineDraw3118",
    equation: "X97520420Y-108467242D01"
  },
  {
    label: "LineDraw3119",
    equation: "X97513790Y-108464881D01"
  },
  {
    label: "LineDraw3120",
    equation: "X97506802Y-108464048D01"
  },
  {
    label: "LineDraw3121",
    equation: "X97506799Y-108464047D01"
  },
  {
    label: "LineDraw3122",
    equation: "X97383698Y-108449368D01"
  },
  {
    label: "LineDraw3123",
    equation: "X97333680Y-108443404D01"
  },
  {
    label: "LineDraw3124",
    equation: "X97326677Y-108444140D01"
  },
  {
    label: "LineDraw3125",
    equation: "X97326676Y-108444140D01"
  },
  {
    label: "LineDraw3126",
    equation: "X97160288Y-108461628D01"
  },
  {
    label: "LineDraw3127",
    equation: "X97160286Y-108461629D01"
  },
  {
    label: "LineDraw3128",
    equation: "X97153288Y-108462364D01"
  },
  {
    label: "LineDraw3129",
    equation: "X96981579Y-108520818D01"
  },
  {
    label: "LineDraw3130",
    equation: "X96950586Y-108539885D01"
  },
  {
    label: "LineDraw3131",
    equation: "X96833095Y-108612166D01"
  },
  {
    label: "LineDraw3132",
    equation: "X96833092Y-108612168D01"
  },
  {
    label: "LineDraw3133",
    equation: "X96827088Y-108615862D01"
  },
  {
    label: "LineDraw3134",
    equation: "X96822053Y-108620793D01"
  },
  {
    label: "LineDraw3135",
    equation: "X96822050Y-108620795D01"
  },
  {
    label: "LineDraw3136",
    equation: "X96703724Y-108736669D01"
  },
  {
    label: "LineDraw3137",
    equation: "X96697493Y-108742771D01"
  },
  {
    label: "LineDraw3138",
    equation: "X96599235Y-108895238D01"
  },
  {
    label: "LineDraw3139",
    equation: "X96596826Y-108901858D01"
  },
  {
    label: "LineDraw3140",
    equation: "X96596824Y-108901861D01"
  },
  {
    label: "LineDraw3141",
    equation: "X96574425Y-108963402D01"
  },
  {
    label: "LineDraw3142",
    equation: "X96537197Y-109065685D01"
  },
  {
    label: "LineDraw3143",
    equation: "X96514463Y-109245640D01"
  },
  {
    label: "LineDraw3144",
    equation: "X96532163Y-109426160D01"
  },
  {
    label: "LineDraw3145",
    equation: "X96589418Y-109598273D01"
  },
  {
    label: "LineDraw3146",
    equation: "X96593065Y-109604295D01"
  },
  {
    label: "LineDraw3147",
    equation: "X96593066Y-109604297D01"
  },
  {
    label: "LineDraw3148",
    equation: "X96675244Y-109739989D01"
  },
  {
    label: "LineDraw3149",
    equation: "X96683380Y-109753424D01"
  },
  {
    label: "LineDraw3150",
    equation: "X96688269Y-109758487D01"
  },
  {
    label: "LineDraw3151",
    equation: "X96688270Y-109758488D01"
  },
  {
    label: "LineDraw3152",
    equation: "X96745017Y-109817251D01"
  },
  {
    label: "LineDraw3153",
    equation: "X96809382Y-109883902D01"
  },
  {
    label: "LineDraw3154",
    equation: "X96821088Y-109891562D01"
  },
  {
    label: "LineDraw3155",
    equation: "X96954608Y-109978935D01"
  },
  {
    label: "LineDraw3156",
    equation: "X96961159Y-109983222D01"
  },
  {
    label: "LineDraw3157",
    equation: "X97059423Y-110019766D01"
  },
  {
    label: "LineDraw3158",
    equation: "X97116296Y-110062257D01"
  },
  {
    label: "LineDraw3159",
    equation: "X97141170Y-110128754D01"
  },
  {
    label: "LineDraw3160",
    equation: "X97141500Y-110137862D01"
  },
  {
    label: "LineDraw3161",
    equation: "X97141500Y-110695761D01"
  },
  {
    label: "LineDraw3162",
    equation: "X97121498Y-110763882D01"
  },
  {
    label: "LineDraw3163",
    equation: "X97104595Y-110784856D01"
  },
  {
    label: "LineDraw3164",
    equation: "X94103766Y-113785685D01"
  },
  {
    label: "LineDraw3165",
    equation: "X94091375Y-113796552D01"
  },
  {
    label: "LineDraw3166",
    equation: "X94066013Y-113816013D01"
  },
  {
    label: "LineDraw3167",
    equation: "X94041526Y-113847925D01"
  },
  {
    label: "LineDraw3168",
    equation: "X94041523Y-113847928D01"
  },
  {
    label: "LineDraw3169",
    equation: "X93968476Y-113943124D01"
  },
  {
    label: "LineDraw3170",
    equation: "X93907162Y-114091149D01"
  },
  {
    label: "LineDraw3171",
    equation: "X93907162Y-114091150D01"
  },
  {
    label: "LineDraw3172",
    equation: "X93905414Y-114104426D01"
  },
  {
    label: "LineDraw3173",
    equation: "X93895604Y-114178944D01"
  },
  {
    label: "LineDraw3174",
    equation: "X93891500Y-114210115D01"
  },
  {
    label: "LineDraw3175",
    equation: "X93891500Y-114210120D01"
  },
  {
    label: "LineDraw3176",
    equation: "X93886250Y-114250000D01"
  },
  {
    label: "LineDraw3177",
    equation: "X93887328Y-114258188D01"
  },
  {
    label: "LineDraw3178",
    equation: "X93890422Y-114281690D01"
  },
  {
    label: "LineDraw3179",
    equation: "X93891500Y-114298136D01"
  },
  {
    label: "LineDraw3180",
    equation: "X93891500Y-114470295D01"
  },
  {
    label: "LineDraw3181",
    equation: "X93871498Y-114538416D01"
  },
  {
    label: "LineDraw3182",
    equation: "X93817842Y-114584909D01"
  },
  {
    label: "LineDraw3183",
    equation: "X93747568Y-114595013D01"
  },
  {
    label: "LineDraw3184",
    equation: "X93697989Y-114576682D01"
  },
  {
    label: "LineDraw3185",
    equation: "X93606666Y-114518727D01"
  },
  {
    label: "LineDraw3186",
    equation: "X93559829Y-114502049D01"
  },
  {
    label: "LineDraw3187",
    equation: "X93442425Y-114460243D01"
  },
  {
    label: "LineDraw3188",
    equation: "X93442420Y-114460242D01"
  },
  {
    label: "LineDraw3189",
    equation: "X93435790Y-114457881D01"
  },
  {
    label: "LineDraw3190",
    equation: "X93428802Y-114457048D01"
  },
  {
    label: "LineDraw3191",
    equation: "X93428799Y-114457047D01"
  },
  {
    label: "LineDraw3192",
    equation: "X93305698Y-114442368D01"
  },
  {
    label: "LineDraw3193",
    equation: "X93255680Y-114436404D01"
  },
  {
    label: "LineDraw3194",
    equation: "X93248677Y-114437140D01"
  },
  {
    label: "LineDraw3195",
    equation: "X93248676Y-114437140D01"
  },
  {
    label: "LineDraw3196",
    equation: "X93082288Y-114454628D01"
  },
  {
    label: "LineDraw3197",
    equation: "X93082286Y-114454629D01"
  },
  {
    label: "LineDraw3198",
    equation: "X93075288Y-114455364D01"
  },
  {
    label: "LineDraw3199",
    equation: "X92903579Y-114513818D01"
  },
  {
    label: "LineDraw3200",
    equation: "X92863596Y-114538416D01"
  },
  {
    label: "LineDraw3201",
    equation: "X92755095Y-114605166D01"
  },
  {
    label: "LineDraw3202",
    equation: "X92755092Y-114605168D01"
  },
  {
    label: "LineDraw3203",
    equation: "X92749088Y-114608862D01"
  },
  {
    label: "LineDraw3204",
    equation: "X92744053Y-114613793D01"
  },
  {
    label: "LineDraw3205",
    equation: "X92744050Y-114613795D01"
  },
  {
    label: "LineDraw3206",
    equation: "X92624525Y-114730843D01"
  },
  {
    label: "LineDraw3207",
    equation: "X92619493Y-114735771D01"
  },
  {
    label: "LineDraw3208",
    equation: "X92521235Y-114888238D01"
  },
  {
    label: "LineDraw3209",
    equation: "X92518826Y-114894858D01"
  },
  {
    label: "LineDraw3210",
    equation: "X92518824Y-114894861D01"
  },
  {
    label: "LineDraw3211",
    equation: "X92508926Y-114922056D01"
  },
  {
    label: "LineDraw3212",
    equation: "X92459197Y-115058685D01"
  },
  {
    label: "LineDraw3213",
    equation: "X92452137Y-115114568D01"
  },
  {
    label: "LineDraw3214",
    equation: "X92423757Y-115179641D01"
  },
  {
    label: "LineDraw3215",
    equation: "X92416227Y-115187868D01"
  },
  {
    label: "LineDraw3216",
    equation: "X91747663Y-115856432D01"
  },
  {
    label: "LineDraw3217",
    equation: "X91685351Y-115890458D01"
  },
  {
    label: "LineDraw3218",
    equation: "X91614536Y-115885393D01"
  },
  {
    label: "LineDraw3219",
    equation: "X91557700Y-115842846D01"
  },
  {
    label: "LineDraw3220",
    equation: "X91539577Y-115808775D01"
  },
  {
    label: "LineDraw3221",
    equation: "X91517555Y-115745538D01"
  },
  {
    label: "LineDraw3222",
    equation: "X91483745Y-115648448D01"
  },
  {
    label: "LineDraw3223",
    equation: "X91387626Y-115494624D01"
  },
  {
    label: "LineDraw3224",
    equation: "X91382664Y-115489627D01"
  },
  {
    label: "LineDraw3225",
    equation: "X91264778Y-115370915D01"
  },
  {
    label: "LineDraw3226",
    equation: "X91264774Y-115370912D01"
  },
  {
    label: "LineDraw3227",
    equation: "X91259815Y-115365918D01"
  },
  {
    label: "LineDraw3228",
    equation: "X91248697Y-115358862D01"
  },
  {
    label: "LineDraw3229",
    equation: "X91184059Y-115317842D01"
  },
  {
    label: "LineDraw3230",
    equation: "X91106666Y-115268727D01"
  },
  {
    label: "LineDraw3231",
    equation: "X91077463Y-115258328D01"
  },
  {
    label: "LineDraw3232",
    equation: "X90942425Y-115210243D01"
  },
  {
    label: "LineDraw3233",
    equation: "X90942420Y-115210242D01"
  },
  {
    label: "LineDraw3234",
    equation: "X90935790Y-115207881D01"
  },
  {
    label: "LineDraw3235",
    equation: "X90928802Y-115207048D01"
  },
  {
    label: "LineDraw3236",
    equation: "X90928799Y-115207047D01"
  },
  {
    label: "LineDraw3237",
    equation: "X90805698Y-115192368D01"
  },
  {
    label: "LineDraw3238",
    equation: "X90755680Y-115186404D01"
  },
  {
    label: "LineDraw3239",
    equation: "X90748677Y-115187140D01"
  },
  {
    label: "LineDraw3240",
    equation: "X90748676Y-115187140D01"
  },
  {
    label: "LineDraw3241",
    equation: "X90582288Y-115204628D01"
  },
  {
    label: "LineDraw3242",
    equation: "X90582286Y-115204629D01"
  },
  {
    label: "LineDraw3243",
    equation: "X90575288Y-115205364D01"
  },
  {
    label: "LineDraw3244",
    equation: "X90403579Y-115263818D01"
  },
  {
    label: "LineDraw3245",
    equation: "X90249088Y-115358862D01"
  },
  {
    label: "LineDraw3246",
    equation: "X90244054Y-115363791D01"
  },
  {
    label: "LineDraw3247",
    equation: "X90242776Y-115364790D01"
  },
  {
    label: "LineDraw3248",
    equation: "X90176782Y-115390967D01"
  },
  {
    label: "LineDraw3249",
    equation: "X90165204Y-115391500D01"
  },
  {
    label: "LineDraw3250",
    equation: "X89498267Y-115391500D01"
  },
  {
    label: "LineDraw3251",
    equation: "X89430146Y-115371498D01"
  },
  {
    label: "LineDraw3252",
    equation: "X89383653Y-115317842D01"
  },
  {
    label: "LineDraw3253",
    equation: "X89373549Y-115247568D01"
  },
  {
    label: "LineDraw3254",
    equation: "X89404631Y-115181190D01"
  },
  {
    label: "LineDraw3255",
    equation: "X89484621Y-115092352D01"
  },
  {
    label: "LineDraw3256",
    equation: "X89484622Y-115092351D01"
  },
  {
    label: "LineDraw3257",
    equation: "X89489040Y-115087444D01"
  },
  {
    label: "LineDraw3258",
    equation: "X89584527Y-114922056D01"
  },
  {
    label: "LineDraw3259",
    equation: "X89643542Y-114740428D01"
  },
  {
    label: "LineDraw3260",
    equation: "X89644550Y-114730843D01"
  },
  {
    label: "LineDraw3261",
    equation: "X89662814Y-114557065D01"
  },
  {
    label: "LineDraw3262",
    equation: "X89663504Y-114550500D01"
  },
  {
    label: "LineDraw3263",
    equation: "X89654018Y-114460243D01"
  },
  {
    label: "LineDraw3264",
    equation: "X89644232Y-114367135D01"
  },
  {
    label: "LineDraw3265",
    equation: "X89644232Y-114367133D01"
  },
  {
    label: "LineDraw3266",
    equation: "X89643542Y-114360572D01"
  },
  {
    label: "LineDraw3267",
    equation: "X89584527Y-114178944D01"
  },
  {
    label: "LineDraw3268",
    equation: "X89489040Y-114013556D01"
  },
  {
    label: "LineDraw3269",
    equation: "X89451672Y-113972054D01"
  },
  {
    label: "LineDraw3270",
    equation: "X89365675Y-113876545D01"
  },
  {
    label: "LineDraw3271",
    equation: "X89365674Y-113876544D01"
  },
  {
    label: "LineDraw3272",
    equation: "X89361253Y-113871634D01"
  },
  {
    label: "LineDraw3273",
    equation: "X89215173Y-113765500D01"
  },
  {
    label: "LineDraw3274",
    equation: "X89212094Y-113763263D01"
  },
  {
    label: "LineDraw3275",
    equation: "X89212093Y-113763262D01"
  },
  {
    label: "LineDraw3276",
    equation: "X89206752Y-113759382D01"
  },
  {
    label: "LineDraw3277",
    equation: "X89200724Y-113756698D01"
  },
  {
    label: "LineDraw3278",
    equation: "X89200722Y-113756697D01"
  },
  {
    label: "LineDraw3279",
    equation: "X89038319Y-113684391D01"
  },
  {
    label: "LineDraw3280",
    equation: "X89038318Y-113684391D01"
  },
  {
    label: "LineDraw3281",
    equation: "X89032288Y-113681706D01"
  },
  {
    label: "LineDraw3282",
    equation: "X88938887Y-113661853D01"
  },
  {
    label: "LineDraw3283",
    equation: "X88851944Y-113643372D01"
  },
  {
    label: "LineDraw3284",
    equation: "X88851939Y-113643372D01"
  },
  {
    label: "LineDraw3285",
    equation: "X88845487Y-113642000D01"
  },
  {
    label: "LineDraw3286",
    equation: "X88654513Y-113642000D01"
  },
  {
    label: "LineDraw3287",
    equation: "X88648061Y-113643372D01"
  },
  {
    label: "LineDraw3288",
    equation: "X88648056Y-113643372D01"
  },
  {
    label: "LineDraw3289",
    equation: "X88561113Y-113661853D01"
  },
  {
    label: "LineDraw3290",
    equation: "X88467712Y-113681706D01"
  },
  {
    label: "LineDraw3291",
    equation: "X88461682Y-113684391D01"
  },
  {
    label: "LineDraw3292",
    equation: "X88461681Y-113684391D01"
  },
  {
    label: "LineDraw3293",
    equation: "X88299278Y-113756697D01"
  },
  {
    label: "LineDraw3294",
    equation: "X88299276Y-113756698D01"
  },
  {
    label: "LineDraw3295",
    equation: "X88293248Y-113759382D01"
  },
  {
    label: "LineDraw3296",
    equation: "X88287907Y-113763262D01"
  },
  {
    label: "LineDraw3297",
    equation: "X88287906Y-113763263D01"
  },
  {
    label: "LineDraw3298",
    equation: "X88284827Y-113765500D01"
  },
  {
    label: "LineDraw3299",
    equation: "X88138747Y-113871634D01"
  },
  {
    label: "LineDraw3300",
    equation: "X88134326Y-113876544D01"
  },
  {
    label: "LineDraw3301",
    equation: "X88134325Y-113876545D01"
  },
  {
    label: "LineDraw3302",
    equation: "X88048329Y-113972054D01"
  },
  {
    label: "LineDraw3303",
    equation: "X88010960Y-114013556D01"
  },
  {
    label: "LineDraw3304",
    equation: "X87958496Y-114104426D01"
  },
  {
    label: "LineDraw3305",
    equation: "X87944597Y-114128500D01"
  },
  {
    label: "LineDraw3306",
    equation: "X87893215Y-114177493D01"
  },
  {
    label: "LineDraw3307",
    equation: "X87835478Y-114191500D01"
  },
  {
    label: "LineDraw3308",
    equation: "X86064595Y-114191500D01"
  },
  {
    label: "LineDraw3309",
    equation: "X85996474Y-114171498D01"
  },
  {
    label: "LineDraw3310",
    equation: "X85975500Y-114154595D01"
  },
  {
    label: "LineDraw3311",
    equation: "X85445405Y-113624500D01"
  },
  {
    label: "LineDraw3312",
    equation: "X85411379Y-113562188D01"
  },
  {
    label: "LineDraw3313",
    equation: "X85408500Y-113535405D01"
  },
  {
    label: "LineDraw3314",
    equation: "X85408500Y-111534500D01"
  },
  {
    label: "LineDraw3315",
    equation: "X85428502Y-111466379D01"
  },
  {
    label: "LineDraw3316",
    equation: "X85482158Y-111419886D01"
  },
  {
    label: "LineDraw3317",
    equation: "X85534500Y-111408500D01"
  },
  {
    label: "LineDraw3318",
    equation: "X85569987Y-111408500D01"
  },
  {
    label: "LineDraw3319",
    equation: "X85576439Y-111407128D01"
  },
  {
    label: "LineDraw3320",
    equation: "X85576444Y-111407128D01"
  },
  {
    label: "LineDraw3321",
    equation: "X85663388Y-111388647D01"
  },
  {
    label: "LineDraw3322",
    equation: "X85756788Y-111368794D01"
  },
  {
    label: "LineDraw3323",
    equation: "X85833594Y-111334598D01"
  },
  {
    label: "LineDraw3324",
    equation: "X85925222Y-111293803D01"
  },
  {
    label: "LineDraw3325",
    equation: "X85925224Y-111293802D01"
  },
  {
    label: "LineDraw3326",
    equation: "X85931252Y-111291118D01"
  },
  {
    label: "LineDraw3327",
    equation: "X85969447Y-111263368D01"
  },
  {
    label: "LineDraw3328",
    equation: "X86008052Y-111235319D01"
  },
  {
    label: "LineDraw3329",
    equation: "X86085753Y-111178866D01"
  },
  {
    label: "LineDraw3330",
    equation: "X86103336Y-111159338D01"
  },
  {
    label: "LineDraw3331",
    equation: "X86209121Y-111041852D01"
  },
  {
    label: "LineDraw3332",
    equation: "X86209122Y-111041851D01"
  },
  {
    label: "LineDraw3333",
    equation: "X86213540Y-111036944D01"
  },
  {
    label: "LineDraw3334",
    equation: "X86277768Y-110925698D01"
  },
  {
    label: "LineDraw3335",
    equation: "X86305723Y-110877279D01"
  },
  {
    label: "LineDraw3336",
    equation: "X86305724Y-110877278D01"
  },
  {
    label: "LineDraw3337",
    equation: "X86309027Y-110871556D01"
  },
  {
    label: "LineDraw3338",
    equation: "X86368042Y-110689928D01"
  },
  {
    label: "LineDraw3339",
    equation: "X86374023Y-110633028D01"
  },
  {
    label: "LineDraw3340",
    equation: "X86387314Y-110506565D01"
  },
  {
    label: "LineDraw3341",
    equation: "X86388004Y-110500000D01"
  },
  {
    label: "LineDraw3342",
    equation: "X86385407Y-110475292D01"
  },
  {
    label: "LineDraw3343",
    equation: "X86368732Y-110316635D01"
  },
  {
    label: "LineDraw3344",
    equation: "X86368732Y-110316633D01"
  },
  {
    label: "LineDraw3345",
    equation: "X86368042Y-110310072D01"
  },
  {
    label: "LineDraw3346",
    equation: "X86309027Y-110128444D01"
  },
  {
    label: "LineDraw3347",
    equation: "X86213540Y-109963056D01"
  },
  {
    label: "LineDraw3348",
    equation: "X86156934Y-109900188D01"
  },
  {
    label: "LineDraw3349",
    equation: "X86090175Y-109826045D01"
  },
  {
    label: "LineDraw3350",
    equation: "X86090174Y-109826044D01"
  },
  {
    label: "LineDraw3351",
    equation: "X86085753Y-109821134D01"
  },
  {
    label: "LineDraw3352",
    equation: "X85984269Y-109747401D01"
  },
  {
    label: "LineDraw3353",
    equation: "X85936594Y-109712763D01"
  },
  {
    label: "LineDraw3354",
    equation: "X85936593Y-109712762D01"
  },
  {
    label: "LineDraw3355",
    equation: "X85931252Y-109708882D01"
  },
  {
    label: "LineDraw3356",
    equation: "X85925224Y-109706198D01"
  },
  {
    label: "LineDraw3357",
    equation: "X85925222Y-109706197D01"
  },
  {
    label: "LineDraw3358",
    equation: "X85762819Y-109633891D01"
  },
  {
    label: "LineDraw3359",
    equation: "X85762818Y-109633891D01"
  },
  {
    label: "LineDraw3360",
    equation: "X85756788Y-109631206D01"
  },
  {
    label: "LineDraw3361",
    equation: "X85643473Y-109607120D01"
  },
  {
    label: "LineDraw3362",
    equation: "X85576444Y-109592872D01"
  },
  {
    label: "LineDraw3363",
    equation: "X85576439Y-109592872D01"
  },
  {
    label: "LineDraw3364",
    equation: "X85569987Y-109591500D01"
  },
  {
    label: "LineDraw3365",
    equation: "X85379013Y-109591500D01"
  },
  {
    label: "LineDraw3366",
    equation: "X85372561Y-109592872D01"
  },
  {
    label: "LineDraw3367",
    equation: "X85372556Y-109592872D01"
  },
  {
    label: "LineDraw3368",
    equation: "X85305527Y-109607120D01"
  },
  {
    label: "LineDraw3369",
    equation: "X85192212Y-109631206D01"
  },
  {
    label: "LineDraw3370",
    equation: "X85186182Y-109633891D01"
  },
  {
    label: "LineDraw3371",
    equation: "X85186181Y-109633891D01"
  },
  {
    label: "LineDraw3372",
    equation: "X85023778Y-109706197D01"
  },
  {
    label: "LineDraw3373",
    equation: "X85023776Y-109706198D01"
  },
  {
    label: "LineDraw3374",
    equation: "X85017748Y-109708882D01"
  },
  {
    label: "LineDraw3375",
    equation: "X85012407Y-109712762D01"
  },
  {
    label: "LineDraw3376",
    equation: "X85012406Y-109712763D01"
  },
  {
    label: "LineDraw3377",
    equation: "X84964731Y-109747401D01"
  },
  {
    label: "LineDraw3378",
    equation: "X84863247Y-109821134D01"
  },
  {
    label: "LineDraw3379",
    equation: "X84858826Y-109826044D01"
  },
  {
    label: "LineDraw3380",
    equation: "X84858825Y-109826045D01"
  },
  {
    label: "LineDraw3381",
    equation: "X84792067Y-109900188D01"
  },
  {
    label: "LineDraw3382",
    equation: "X84735460Y-109963056D01"
  },
  {
    label: "LineDraw3383",
    equation: "X84639973Y-110128444D01"
  },
  {
    label: "LineDraw3384",
    equation: "X84580958Y-110310072D01"
  },
  {
    label: "LineDraw3385",
    equation: "X84580268Y-110316633D01"
  },
  {
    label: "LineDraw3386",
    equation: "X84580268Y-110316635D01"
  },
  {
    label: "LineDraw3387",
    equation: "X84563593Y-110475292D01"
  },
  {
    label: "LineDraw3388",
    equation: "X84536580Y-110540949D01"
  },
  {
    label: "LineDraw3389",
    equation: "X84527378Y-110551217D01"
  },
  {
    label: "LineDraw3390",
    equation: "X84382747Y-110695848D01"
  },
  {
    label: "LineDraw3391",
    equation: "X84374461Y-110703388D01"
  },
  {
    label: "LineDraw3392",
    equation: "X84367982Y-110707500D01"
  },
  {
    label: "LineDraw3393",
    equation: "X84362557Y-110713277D01"
  },
  {
    label: "LineDraw3394",
    equation: "X84321357Y-110757151D01"
  },
  {
    label: "LineDraw3395",
    equation: "X84318602Y-110759993D01"
  },
  {
    label: "LineDraw3396",
    equation: "X84298865Y-110779730D01"
  },
  {
    label: "LineDraw3397",
    equation: "X84296385Y-110782927D01"
  },
  {
    label: "LineDraw3398",
    equation: "X84288682Y-110791947D01"
  },
  {
    label: "LineDraw3399",
    equation: "X84258414Y-110824179D01"
  },
  {
    label: "LineDraw3400",
    equation: "X84254595Y-110831125D01"
  },
  {
    label: "LineDraw3401",
    equation: "X84254593Y-110831128D01"
  },
  {
    label: "LineDraw3402",
    equation: "X84248652Y-110841934D01"
  },
  {
    label: "LineDraw3403",
    equation: "X84237801Y-110858453D01"
  },
  {
    label: "LineDraw3404",
    equation: "X84225386Y-110874459D01"
  },
  {
    label: "LineDraw3405",
    equation: "X84222241Y-110881728D01"
  },
  {
    label: "LineDraw3406",
    equation: "X84222238Y-110881732D01"
  },
  {
    label: "LineDraw3407",
    equation: "X84207826Y-110915037D01"
  },
  {
    label: "LineDraw3408",
    equation: "X84202609Y-110925687D01"
  },
  {
    label: "LineDraw3409",
    equation: "X84181305Y-110964440D01"
  },
  {
    label: "LineDraw3410",
    equation: "X84179334Y-110972115D01"
  },
  {
    label: "LineDraw3411",
    equation: "X84179334Y-110972116D01"
  },
  {
    label: "LineDraw3412",
    equation: "X84176267Y-110984062D01"
  },
  {
    label: "LineDraw3413",
    equation: "X84169863Y-111002766D01"
  },
  {
    label: "LineDraw3414",
    equation: "X84161819Y-111021355D01"
  },
  {
    label: "LineDraw3415",
    equation: "X84160580Y-111029178D01"
  },
  {
    label: "LineDraw3416",
    equation: "X84160577Y-111029188D01"
  },
  {
    label: "LineDraw3417",
    equation: "X84154901Y-111065024D01"
  },
  {
    label: "LineDraw3418",
    equation: "X84152495Y-111076644D01"
  },
  {
    label: "LineDraw3419",
    equation: "X84141500Y-111119470D01"
  },
  {
    label: "LineDraw3420",
    equation: "X84141500Y-111139724D01"
  },
  {
    label: "LineDraw3421",
    equation: "X84139949Y-111159434D01"
  },
  {
    label: "LineDraw3422",
    equation: "X84136780Y-111179443D01"
  },
  {
    label: "LineDraw3423",
    equation: "X84137526Y-111187335D01"
  },
  {
    label: "LineDraw3424",
    equation: "X84140941Y-111223461D01"
  },
  {
    label: "LineDraw3425",
    equation: "X84141500Y-111235319D01"
  },
  {
    label: "LineDraw3426",
    equation: "X84141500Y-113765500D01"
  },
  {
    label: "LineDraw3427",
    equation: "X84121498Y-113833621D01"
  },
  {
    label: "LineDraw3428",
    equation: "X84067842Y-113880114D01"
  },
  {
    label: "LineDraw3429",
    equation: "X84015500Y-113891500D01"
  },
  {
    label: "LineDraw3430",
    equation: "X76834751Y-113891500D01"
  },
  {
    label: "LineDraw3431",
    equation: "X76766630Y-113871498D01"
  },
  {
    label: "LineDraw3432",
    equation: "X76762157Y-113868276D01"
  },
  {
    label: "LineDraw3433",
    equation: "X76759815Y-113865918D01"
  },
  {
    label: "LineDraw3434",
    equation: "X76749879Y-113859612D01"
  },
  {
    label: "LineDraw3435",
    equation: "X76670377Y-113809159D01"
  },
  {
    label: "LineDraw3436",
    equation: "X76606666Y-113768727D01"
  },
  {
    label: "LineDraw3437",
    equation: "X76558989Y-113751750D01"
  },
  {
    label: "LineDraw3438",
    equation: "X76442425Y-113710243D01"
  },
  {
    label: "LineDraw3439",
    equation: "X76442420Y-113710242D01"
  },
  {
    label: "LineDraw3440",
    equation: "X76435790Y-113707881D01"
  },
  {
    label: "LineDraw3441",
    equation: "X76428802Y-113707048D01"
  },
  {
    label: "LineDraw3442",
    equation: "X76428799Y-113707047D01"
  },
  {
    label: "LineDraw3443",
    equation: "X76295573Y-113691161D01"
  },
  {
    label: "LineDraw3444",
    equation: "X76255680Y-113686404D01"
  },
  {
    label: "LineDraw3445",
    equation: "X76248677Y-113687140D01"
  },
  {
    label: "LineDraw3446",
    equation: "X76248676Y-113687140D01"
  },
  {
    label: "LineDraw3447",
    equation: "X76082288Y-113704628D01"
  },
  {
    label: "LineDraw3448",
    equation: "X76082286Y-113704629D01"
  },
  {
    label: "LineDraw3449",
    equation: "X76075288Y-113705364D01"
  },
  {
    label: "LineDraw3450",
    equation: "X75903579Y-113763818D01"
  },
  {
    label: "LineDraw3451",
    equation: "X75825520Y-113811841D01"
  },
  {
    label: "LineDraw3452",
    equation: "X75757021Y-113830498D01"
  },
  {
    label: "LineDraw3453",
    equation: "X75689307Y-113809159D01"
  },
  {
    label: "LineDraw3454",
    equation: "X75643879Y-113754599D01"
  },
  {
    label: "LineDraw3455",
    equation: "X75633500Y-113704522D01"
  },
  {
    label: "LineDraw3456",
    equation: "X75633500Y-107064594D01"
  },
  {
    label: "LineDraw3457",
    equation: "X75653502Y-106996473D01"
  },
  {
    label: "LineDraw3458",
    equation: "X75670405Y-106975499D01"
  },
  {
    label: "LineDraw3459",
    equation: "X78225499Y-104420405D01"
  },
  {
    label: "LineDraw3460",
    equation: "X78287811Y-104386379D01"
  },
  {
    label: "LineDraw3461",
    equation: "X78314594Y-104383500D01"
  },
  {
    label: "LineDraw3462",
    equation: "X80041800Y-104383500D01"
  },
  {
    label: "LineDraw3463",
    equation: "X80109921Y-104403502D01"
  },
  {
    label: "LineDraw3464",
    equation: "X80129147Y-104419843D01"
  },
  {
    label: "LineDraw3465",
    equation: "X80129420Y-104419540D01"
  },
  {
    label: "LineDraw3466",
    equation: "X80134332Y-104423963D01"
  },
  {
    label: "LineDraw3467",
    equation: "X80138747Y-104428866D01"
  },
  {
    label: "LineDraw3468",
    equation: "X80293248Y-104541118D01"
  },
  {
    label: "LineDraw3469",
    equation: "X80299276Y-104543802D01"
  },
  {
    label: "LineDraw3470",
    equation: "X80299278Y-104543803D01"
  },
  {
    label: "LineDraw3471",
    equation: "X80461681Y-104616109D01"
  },
  {
    label: "LineDraw3472",
    equation: "X80467712Y-104618794D01"
  },
  {
    label: "LineDraw3473",
    equation: "X80561113Y-104638647D01"
  },
  {
    label: "LineDraw3474",
    equation: "X80648056Y-104657128D01"
  },
  {
    label: "LineDraw3475",
    equation: "X80648061Y-104657128D01"
  },
  {
    label: "LineDraw3476",
    equation: "X80654513Y-104658500D01"
  },
  {
    label: "LineDraw3477",
    equation: "X80845487Y-104658500D01"
  },
  {
    label: "LineDraw3478",
    equation: "X80851939Y-104657128D01"
  },
  {
    label: "LineDraw3479",
    equation: "X80851944Y-104657128D01"
  },
  {
    label: "LineDraw3480",
    equation: "X80938888Y-104638647D01"
  },
  {
    label: "LineDraw3481",
    equation: "X81032288Y-104618794D01"
  },
  {
    label: "LineDraw3482",
    equation: "X81038319Y-104616109D01"
  },
  {
    label: "LineDraw3483",
    equation: "X81200722Y-104543803D01"
  },
  {
    label: "LineDraw3484",
    equation: "X81200724Y-104543802D01"
  },
  {
    label: "LineDraw3485",
    equation: "X81206752Y-104541118D01"
  },
  {
    label: "LineDraw3486",
    equation: "X81361253Y-104428866D01"
  },
  {
    label: "LineDraw3487",
    equation: "X81384091Y-104403502D01"
  },
  {
    label: "LineDraw3488",
    equation: "X81484621Y-104291852D01"
  },
  {
    label: "LineDraw3489",
    equation: "X81484622Y-104291851D01"
  },
  {
    label: "LineDraw3490",
    equation: "X81489040Y-104286944D01"
  },
  {
    label: "LineDraw3491",
    equation: "X81584527Y-104121556D01"
  },
  {
    label: "LineDraw3492",
    equation: "X81643542Y-103939928D01"
  },
  {
    label: "LineDraw3493",
    equation: "X81663504Y-103750000D01"
  },
  {
    label: "LineDraw3494",
    equation: "X81647292Y-103595747D01"
  },
  {
    label: "LineDraw3495",
    equation: "X81644232Y-103566635D01"
  },
  {
    label: "LineDraw3496",
    equation: "X81644232Y-103566633D01"
  },
  {
    label: "LineDraw3497",
    equation: "X81643542Y-103560072D01"
  },
  {
    label: "LineDraw3498",
    equation: "X81584527Y-103378444D01"
  },
  {
    label: "LineDraw3499",
    equation: "X81489040Y-103213056D01"
  },
  {
    label: "LineDraw3500",
    equation: "X81474707Y-103197137D01"
  },
  {
    label: "LineDraw3501",
    equation: "X81365675Y-103076045D01"
  },
  {
    label: "LineDraw3502",
    equation: "X81365674Y-103076044D01"
  },
  {
    label: "LineDraw3503",
    equation: "X81361253Y-103071134D01"
  },
  {
    label: "LineDraw3504",
    equation: "X81206752Y-102958882D01"
  },
  {
    label: "LineDraw3505",
    equation: "X81200724Y-102956198D01"
  },
  {
    label: "LineDraw3506",
    equation: "X81200722Y-102956197D01"
  },
  {
    label: "LineDraw3507",
    equation: "X81038319Y-102883891D01"
  },
  {
    label: "LineDraw3508",
    equation: "X81038318Y-102883891D01"
  },
  {
    label: "LineDraw3509",
    equation: "X81032288Y-102881206D01"
  },
  {
    label: "LineDraw3510",
    equation: "X80904215Y-102853983D01"
  },
  {
    label: "LineDraw3511",
    equation: "X80851944Y-102842872D01"
  },
  {
    label: "LineDraw3512",
    equation: "X80851939Y-102842872D01"
  },
  {
    label: "LineDraw3513",
    equation: "X80845487Y-102841500D01"
  },
  {
    label: "LineDraw3514",
    equation: "X80654513Y-102841500D01"
  },
  {
    label: "LineDraw3515",
    equation: "X80648061Y-102842872D01"
  },
  {
    label: "LineDraw3516",
    equation: "X80648056Y-102842872D01"
  },
  {
    label: "LineDraw3517",
    equation: "X80595785Y-102853983D01"
  },
  {
    label: "LineDraw3518",
    equation: "X80467712Y-102881206D01"
  },
  {
    label: "LineDraw3519",
    equation: "X80461682Y-102883891D01"
  },
  {
    label: "LineDraw3520",
    equation: "X80461681Y-102883891D01"
  },
  {
    label: "LineDraw3521",
    equation: "X80299278Y-102956197D01"
  },
  {
    label: "LineDraw3522",
    equation: "X80299276Y-102956198D01"
  },
  {
    label: "LineDraw3523",
    equation: "X80293248Y-102958882D01"
  },
  {
    label: "LineDraw3524",
    equation: "X80138747Y-103071134D01"
  },
  {
    label: "LineDraw3525",
    equation: "X80134332Y-103076037D01"
  },
  {
    label: "LineDraw3526",
    equation: "X80129420Y-103080460D01"
  },
  {
    label: "LineDraw3527",
    equation: "X80128295Y-103079211D01"
  },
  {
    label: "LineDraw3528",
    equation: "X80074986Y-103112051D01"
  },
  {
    label: "LineDraw3529",
    equation: "X80041800Y-103116500D01"
  },
  {
    label: "LineDraw3530",
    equation: "X78078768Y-103116500D01"
  },
  {
    label: "LineDraw3531",
    equation: "X78067585Y-103115973D01"
  },
  {
    label: "LineDraw3532",
    equation: "X78060092Y-103114298D01"
  },
  {
    label: "LineDraw3533",
    equation: "X78052166Y-103114547D01"
  },
  {
    label: "LineDraw3534",
    equation: "X78052165Y-103114547D01"
  },
  {
    label: "LineDraw3535",
    equation: "X77992002Y-103116438D01"
  },
  {
    label: "LineDraw3536",
    equation: "X77988044Y-103116500D01"
  },
  {
    label: "LineDraw3537",
    equation: "X77960144Y-103116500D01"
  },
  {
    label: "LineDraw3538",
    equation: "X77956154Y-103117004D01"
  },
  {
    label: "LineDraw3539",
    equation: "X77944320Y-103117936D01"
  },
  {
    label: "LineDraw3540",
    equation: "X77900111Y-103119326D01"
  },
  {
    label: "LineDraw3541",
    equation: "X77892495Y-103121539D01"
  },
  {
    label: "LineDraw3542",
    equation: "X77892493Y-103121539D01"
  },
  {
    label: "LineDraw3543",
    equation: "X77880652Y-103124979D01"
  },
  {
    label: "LineDraw3544",
    equation: "X77861293Y-103128988D01"
  },
  {
    label: "LineDraw3545",
    equation: "X77859983Y-103129154D01"
  },
  {
    label: "LineDraw3546",
    equation: "X77841203Y-103131526D01"
  },
  {
    label: "LineDraw3547",
    equation: "X77833837Y-103134442D01"
  },
  {
    label: "LineDraw3548",
    equation: "X77833831Y-103134444D01"
  },
  {
    label: "LineDraw3549",
    equation: "X77800098Y-103147800D01"
  },
  {
    label: "LineDraw3550",
    equation: "X77788868Y-103151645D01"
  },
  {
    label: "LineDraw3551",
    equation: "X77754017Y-103161770D01"
  },
  {
    label: "LineDraw3552",
    equation: "X77746407Y-103163981D01"
  },
  {
    label: "LineDraw3553",
    equation: "X77739584Y-103168016D01"
  },
  {
    label: "LineDraw3554",
    equation: "X77728966Y-103174295D01"
  },
  {
    label: "LineDraw3555",
    equation: "X77711213Y-103182992D01"
  },
  {
    label: "LineDraw3556",
    equation: "X77703568Y-103186019D01"
  },
  {
    label: "LineDraw3557",
    equation: "X77692383Y-103190448D01"
  },
  {
    label: "LineDraw3558",
    equation: "X77668021Y-103208148D01"
  },
  {
    label: "LineDraw3559",
    equation: "X77656612Y-103216437D01"
  },
  {
    label: "LineDraw3560",
    equation: "X77646695Y-103222951D01"
  },
  {
    label: "LineDraw3561",
    equation: "X77608638Y-103245458D01"
  },
  {
    label: "LineDraw3562",
    equation: "X77594317Y-103259779D01"
  },
  {
    label: "LineDraw3563",
    equation: "X77579284Y-103272619D01"
  },
  {
    label: "LineDraw3564",
    equation: "X77562893Y-103284528D01"
  },
  {
    label: "LineDraw3565",
    equation: "X77536846Y-103316013D01"
  },
  {
    label: "LineDraw3566",
    equation: "X77534702Y-103318605D01"
  },
  {
    label: "LineDraw3567",
    equation: "X77526712Y-103327384D01"
  },
  {
    label: "LineDraw3568",
    equation: "X74607747Y-106246348D01"
  },
  {
    label: "LineDraw3569",
    equation: "X74599461Y-106253888D01"
  },
  {
    label: "LineDraw3570",
    equation: "X74592982Y-106258000D01"
  },
  {
    label: "LineDraw3571",
    equation: "X74587557Y-106263777D01"
  },
  {
    label: "LineDraw3572",
    equation: "X74546357Y-106307651D01"
  },
  {
    label: "LineDraw3573",
    equation: "X74543602Y-106310493D01"
  },
  {
    label: "LineDraw3574",
    equation: "X74523865Y-106330230D01"
  },
  {
    label: "LineDraw3575",
    equation: "X74521385Y-106333427D01"
  },
  {
    label: "LineDraw3576",
    equation: "X74513682Y-106342447D01"
  },
  {
    label: "LineDraw3577",
    equation: "X74483414Y-106374679D01"
  },
  {
    label: "LineDraw3578",
    equation: "X74479595Y-106381625D01"
  },
  {
    label: "LineDraw3579",
    equation: "X74479593Y-106381628D01"
  },
  {
    label: "LineDraw3580",
    equation: "X74473652Y-106392434D01"
  },
  {
    label: "LineDraw3581",
    equation: "X74462801Y-106408953D01"
  },
  {
    label: "LineDraw3582",
    equation: "X74450386Y-106424959D01"
  },
  {
    label: "LineDraw3583",
    equation: "X74447241Y-106432228D01"
  },
  {
    label: "LineDraw3584",
    equation: "X74447238Y-106432232D01"
  },
  {
    label: "LineDraw3585",
    equation: "X74432826Y-106465537D01"
  },
  {
    label: "LineDraw3586",
    equation: "X74427609Y-106476187D01"
  },
  {
    label: "LineDraw3587",
    equation: "X74406305Y-106514940D01"
  },
  {
    label: "LineDraw3588",
    equation: "X74402088Y-106531366D01"
  },
  {
    label: "LineDraw3589",
    equation: "X74401267Y-106534562D01"
  },
  {
    label: "LineDraw3590",
    equation: "X74394863Y-106553266D01"
  },
  {
    label: "LineDraw3591",
    equation: "X74390817Y-106562617D01"
  },
  {
    label: "LineDraw3592",
    equation: "X74386819Y-106571855D01"
  },
  {
    label: "LineDraw3593",
    equation: "X74385580Y-106579678D01"
  },
  {
    label: "LineDraw3594",
    equation: "X74385577Y-106579688D01"
  },
  {
    label: "LineDraw3595",
    equation: "X74379901Y-106615524D01"
  },
  {
    label: "LineDraw3596",
    equation: "X74377495Y-106627144D01"
  },
  {
    label: "LineDraw3597",
    equation: "X74366500Y-106669970D01"
  },
  {
    label: "LineDraw3598",
    equation: "X74366500Y-106690224D01"
  },
  {
    label: "LineDraw3599",
    equation: "X74364949Y-106709934D01"
  },
  {
    label: "LineDraw3600",
    equation: "X74361780Y-106729943D01"
  },
  {
    label: "LineDraw3601",
    equation: "X74362526Y-106737835D01"
  },
  {
    label: "LineDraw3602",
    equation: "X74365941Y-106773961D01"
  },
  {
    label: "LineDraw3603",
    equation: "X74366500Y-106785819D01"
  },
  {
    label: "LineDraw3604",
    equation: "X74366500Y-128671233D01"
  },
  {
    label: "LineDraw3605",
    equation: "X74365973Y-128682416D01"
  },
  {
    label: "LineDraw3606",
    equation: "X74364298Y-128689909D01"
  },
  {
    label: "LineDraw3607",
    equation: "X74364547Y-128697835D01"
  },
  {
    label: "LineDraw3608",
    equation: "X74364547Y-128697836D01"
  },
  {
    label: "LineDraw3609",
    equation: "X74366438Y-128757986D01"
  },
  {
    label: "LineDraw3610",
    equation: "X74366500Y-128761945D01"
  },
  {
    label: "LineDraw3611",
    equation: "X74366500Y-128789856D01"
  },
  {
    label: "LineDraw3612",
    equation: "X74366997Y-128793790D01"
  },
  {
    label: "LineDraw3613",
    equation: "X74366997Y-128793791D01"
  },
  {
    label: "LineDraw3614",
    equation: "X74367005Y-128793856D01"
  },
  {
    label: "LineDraw3615",
    equation: "X74367938Y-128805693D01"
  },
  {
    label: "LineDraw3616",
    equation: "X74369327Y-128849889D01"
  },
  {
    label: "LineDraw3617",
    equation: "X74374978Y-128869339D01"
  },
  {
    label: "LineDraw3618",
    equation: "X74378987Y-128888700D01"
  },
  {
    label: "LineDraw3619",
    equation: "X74380026Y-128896920D01"
  },
  {
    label: "LineDraw3620",
    equation: "X74381526Y-128908797D01"
  },
  {
    label: "LineDraw3621",
    equation: "X74384445Y-128916168D01"
  },
  {
    label: "LineDraw3622",
    equation: "X74384445Y-128916170D01"
  },
  {
    label: "LineDraw3623",
    equation: "X74397804Y-128949912D01"
  },
  {
    label: "LineDraw3624",
    equation: "X74401649Y-128961142D01"
  },
  {
    label: "LineDraw3625",
    equation: "X74411771Y-128995983D01"
  },
  {
    label: "LineDraw3626",
    equation: "X74413982Y-129003593D01"
  },
  {
    label: "LineDraw3627",
    equation: "X74418015Y-129010412D01"
  },
  {
    label: "LineDraw3628",
    equation: "X74418017Y-129010417D01"
  },
  {
    label: "LineDraw3629",
    equation: "X74424293Y-129021028D01"
  },
  {
    label: "LineDraw3630",
    equation: "X74432988Y-129038776D01"
  },
  {
    label: "LineDraw3631",
    equation: "X74440448Y-129057617D01"
  },
  {
    label: "LineDraw3632",
    equation: "X74445110Y-129064033D01"
  },
  {
    label: "LineDraw3633",
    equation: "X74445110Y-129064034D01"
  },
  {
    label: "LineDraw3634",
    equation: "X74466436Y-129093387D01"
  },
  {
    label: "LineDraw3635",
    equation: "X74472952Y-129103307D01"
  },
  {
    label: "LineDraw3636",
    equation: "X74479630Y-129114598D01"
  },
  {
    label: "LineDraw3637",
    equation: "X74495458Y-129141362D01"
  },
  {
    label: "LineDraw3638",
    equation: "X74509779Y-129155683D01"
  },
  {
    label: "LineDraw3639",
    equation: "X74522619Y-129170716D01"
  },
  {
    label: "LineDraw3640",
    equation: "X74534528Y-129187107D01"
  },
  {
    label: "LineDraw3641",
    equation: "X74562261Y-129210050D01"
  },
  {
    label: "LineDraw3642",
    equation: "X74568605Y-129215298D01"
  },
  {
    label: "LineDraw3643",
    equation: "X74577384Y-129223288D01"
  },
  {
    label: "LineDraw3644",
    equation: "X80232878Y-134878783D01"
  },
  {
    label: "LineDraw3645",
    equation: "X80266904Y-134941095D01"
  },
  {
    label: "LineDraw3646",
    equation: "X80269093Y-134954706D01"
  },
  {
    label: "LineDraw3647",
    equation: "X80275023Y-135011134D01"
  },
  {
    label: "LineDraw3648",
    equation: "X80285680Y-135112522D01"
  },
  {
    label: "LineDraw3649",
    equation: "X80286458Y-135119928D01"
  },
  {
    label: "LineDraw3650",
    equation: "X80345473Y-135301556D01"
  },
  {
    label: "LineDraw3651",
    equation: "X80440960Y-135466944D01"
  },
  {
    label: "LineDraw3652",
    equation: "X80445378Y-135471851D01"
  },
  {
    label: "LineDraw3653",
    equation: "X80445379Y-135471852D01"
  },
  {
    label: "LineDraw3654",
    equation: "X80528243Y-135563882D01"
  },
  {
    label: "LineDraw3655",
    equation: "X80568747Y-135608866D01"
  },
  {
    label: "LineDraw3656",
    equation: "X80723248Y-135721118D01"
  },
  {
    label: "LineDraw3657",
    equation: "X80729276Y-135723802D01"
  },
  {
    label: "LineDraw3658",
    equation: "X80729278Y-135723803D01"
  },
  {
    label: "LineDraw3659",
    equation: "X80810848Y-135760120D01"
  },
  {
    label: "LineDraw3660",
    equation: "X80897712Y-135798794D01"
  },
  {
    label: "LineDraw3661",
    equation: "X80986563Y-135817680D01"
  },
  {
    label: "LineDraw3662",
    equation: "X81078056Y-135837128D01"
  },
  {
    label: "LineDraw3663",
    equation: "X81078061Y-135837128D01"
  },
  {
    label: "LineDraw3664",
    equation: "X81084513Y-135838500D01"
  },
  {
    label: "LineDraw3665",
    equation: "X81275487Y-135838500D01"
  },
  {
    label: "LineDraw3666",
    equation: "X81281939Y-135837128D01"
  },
  {
    label: "LineDraw3667",
    equation: "X81281944Y-135837128D01"
  },
  {
    label: "LineDraw3668",
    equation: "X81373437Y-135817680D01"
  },
  {
    label: "LineDraw3669",
    equation: "X81462288Y-135798794D01"
  },
  {
    label: "LineDraw3670",
    equation: "X81549152Y-135760120D01"
  },
  {
    label: "LineDraw3671",
    equation: "X81630722Y-135723803D01"
  },
  {
    label: "LineDraw3672",
    equation: "X81630724Y-135723802D01"
  },
  {
    label: "LineDraw3673",
    equation: "X81636752Y-135721118D01"
  },
  {
    label: "LineDraw3674",
    equation: "X81791253Y-135608866D01"
  },
  {
    label: "LineDraw3675",
    equation: "X81831757Y-135563882D01"
  },
  {
    label: "LineDraw3676",
    equation: "X81914621Y-135471852D01"
  },
  {
    label: "LineDraw3677",
    equation: "X81914622Y-135471851D01"
  },
  {
    label: "LineDraw3678",
    equation: "X81919040Y-135466944D01"
  },
  {
    label: "LineDraw3679",
    equation: "X82006381Y-135315665D01"
  },
  {
    label: "LineDraw3680",
    equation: "X82057763Y-135266672D01"
  },
  {
    label: "LineDraw3681",
    equation: "X82127477Y-135253236D01"
  },
  {
    label: "LineDraw3682",
    equation: "X82193388Y-135279622D01"
  },
  {
    label: "LineDraw3683",
    equation: "X82234570Y-135337454D01"
  },
  {
    label: "LineDraw3684",
    equation: "X82241500Y-135378665D01"
  },
  {
    label: "LineDraw3685",
    equation: "X82241500Y-135495761D01"
  },
  {
    label: "LineDraw3686",
    equation: "X82221498Y-135563882D01"
  },
  {
    label: "LineDraw3687",
    equation: "X82204595Y-135584856D01"
  },
  {
    label: "LineDraw3688",
    equation: "X81734856Y-136054595D01"
  },
  {
    label: "LineDraw3689",
    equation: "X81672544Y-136088621D01"
  },
  {
    label: "LineDraw3690",
    equation: "X81645761Y-136091500D01"
  },
  {
    label: "LineDraw3691",
    equation: "X75664239Y-136091500D01"
  },
  {
    label: "LineDraw3692",
    equation: "X75596118Y-136071498D01"
  },
  {
    label: "LineDraw3693",
    equation: "X75575144Y-136054595D01"
  },
  {
    label: "LineDraw3694",
    equation: "X72595380Y-133074831D01"
  },
  {
    label: "LineDraw3695",
    equation: "X72561354Y-133012519D01"
  },
  {
    label: "LineDraw3696",
    equation: "X72558475Y-132985736D01"
  },
  {
    label: "LineDraw3697",
    equation: "X72558475Y-132008161D01"
  },
  {
    label: "LineDraw3698",
    equation: "X72559553Y-131991715D01"
  },
  {
    label: "LineDraw3699",
    equation: "X72562647Y-131968213D01"
  },
  {
    label: "LineDraw3700",
    equation: "X72563725Y-131960025D01"
  },
  {
    label: "LineDraw3701",
    equation: "X72558475Y-131920147D01"
  },
  {
    label: "LineDraw3702",
    equation: "X72558475Y-131920140D01"
  },
  {
    label: "LineDraw3703",
    equation: "X72542813Y-131801175D01"
  },
  {
    label: "LineDraw3704",
    equation: "X72481499Y-131653150D01"
  },
  {
    label: "LineDraw3705",
    equation: "X72449734Y-131611753D01"
  },
  {
    label: "LineDraw3706",
    equation: "X72408452Y-131557953D01"
  },
  {
    label: "LineDraw3707",
    equation: "X72408449Y-131557950D01"
  },
  {
    label: "LineDraw3708",
    equation: "X72383962Y-131526038D01"
  },
  {
    label: "LineDraw3709",
    equation: "X72365565Y-131511921D01"
  },
  {
    label: "LineDraw3710",
    equation: "X72358596Y-131506573D01"
  },
  {
    label: "LineDraw3711",
    equation: "X72346205Y-131495706D01"
  },
  {
    label: "LineDraw3712",
    equation: "X68505808Y-127655309D01"
  },
  {
    label: "LineDraw3713",
    equation: "X68471782Y-127592997D01"
  },
  {
    label: "LineDraw3714",
    equation: "X68476847Y-127522182D01"
  },
  {
    label: "LineDraw3715",
    equation: "X68519394Y-127465346D01"
  },
  {
    label: "LineDraw3716",
    equation: "X68555967Y-127446381D01"
  },
  {
    label: "LineDraw3717",
    equation: "X68701408Y-127399124D01"
  },
  {
    label: "LineDraw3718",
    equation: "X68708108Y-127396947D01"
  },
  {
    label: "LineDraw3719",
    equation: "X68863912Y-127304069D01"
  },
  {
    label: "LineDraw3720",
    equation: "X68995266Y-127178982D01"
  },
  {
    label: "LineDraw3721",
    equation: "X69095643Y-127027902D01"
  },
  {
    label: "LineDraw3722",
    equation: "X69153932Y-126874457D01"
  },
  {
    label: "LineDraw3723",
    equation: "X69157555Y-126864920D01"
  },
  {
    label: "LineDraw3724",
    equation: "X69157556Y-126864918D01"
  },
  {
    label: "LineDraw3725",
    equation: "X69160055Y-126858338D01"
  },
  {
    label: "LineDraw3726",
    equation: "X69161452Y-126848401D01"
  },
  {
    label: "LineDraw3727",
    equation: "X69184748Y-126682639D01"
  },
  {
    label: "LineDraw3728",
    equation: "X69184748Y-126682636D01"
  },
  {
    label: "LineDraw3729",
    equation: "X69185299Y-126678717D01"
  },
  {
    label: "LineDraw3730",
    equation: "X69185616Y-126656000D01"
  },
  {
    label: "LineDraw3731",
    equation: "X69165397Y-126475745D01"
  },
  {
    label: "LineDraw3732",
    equation: "X69162226Y-126466638D01"
  },
  {
    label: "LineDraw3733",
    equation: "X69108064Y-126311106D01"
  },
  {
    label: "LineDraw3734",
    equation: "X69108062Y-126311103D01"
  },
  {
    label: "LineDraw3735",
    equation: "X69105745Y-126304448D01"
  },
  {
    label: "LineDraw3736",
    equation: "X69095661Y-126288310D01"
  },
  {
    label: "LineDraw3737",
    equation: "X69024646Y-126174661D01"
  },
  {
    label: "LineDraw3738",
    equation: "X69005500Y-126107892D01"
  },
  {
    label: "LineDraw3739",
    equation: "X69005500Y-110333594D01"
  },
  {
    label: "LineDraw3740",
    equation: "X69025502Y-110265473D01"
  },
  {
    label: "LineDraw3741",
    equation: "X69042405Y-110244499D01"
  },
  {
    label: "LineDraw3742",
    equation: "X76343717Y-102943187D01"
  },
  {
    label: "LineDraw3743",
    equation: "X76406029Y-102909161D01"
  },
  {
    label: "LineDraw3744",
    equation: "X76440490Y-102907093D01"
  },
  {
    label: "LineDraw3745",
    equation: "X76443214Y-102907702D01"
  },
  {
    label: "LineDraw3746",
    equation: "X76451135Y-102907453D01"
  },
  {
    label: "LineDraw3747",
    equation: "X76511291Y-102905562D01"
  },
  {
    label: "LineDraw3748",
    equation: "X76515250Y-102905500D01"
  },
  {
    label: "LineDraw3749",
    equation: "X76543161Y-102905500D01"
  },
  {
    label: "LineDraw3750",
    equation: "X76547096Y-102905003D01"
  },
  {
    label: "LineDraw3751",
    equation: "X76547161Y-102904995D01"
  },
  {
    label: "LineDraw3752",
    equation: "X76558998Y-102904062D01"
  },
  {
    label: "LineDraw3753",
    equation: "X76591256Y-102903048D01"
  },
  {
    label: "LineDraw3754",
    equation: "X76595275Y-102902922D01"
  },
  {
    label: "LineDraw3755",
    equation: "X76603194Y-102902673D01"
  },
  {
    label: "LineDraw3756",
    equation: "X76622648Y-102897021D01"
  },
  {
    label: "LineDraw3757",
    equation: "X76642005Y-102893013D01"
  },
  {
    label: "LineDraw3758",
    equation: "X76654235Y-102891468D01"
  },
  {
    label: "LineDraw3759",
    equation: "X76654236Y-102891468D01"
  },
  {
    label: "LineDraw3760",
    equation: "X76662102Y-102890474D01"
  },
  {
    label: "LineDraw3761",
    equation: "X76669473Y-102887555D01"
  },
  {
    label: "LineDraw3762",
    equation: "X76669475Y-102887555D01"
  },
  {
    label: "LineDraw3763",
    equation: "X76703217Y-102874196D01"
  },
  {
    label: "LineDraw3764",
    equation: "X76714447Y-102870351D01"
  },
  {
    label: "LineDraw3765",
    equation: "X76749288Y-102860229D01"
  },
  {
    label: "LineDraw3766",
    equation: "X76749289Y-102860229D01"
  },
  {
    label: "LineDraw3767",
    equation: "X76756898Y-102858018D01"
  },
  {
    label: "LineDraw3768",
    equation: "X76763717Y-102853985D01"
  },
  {
    label: "LineDraw3769",
    equation: "X76763722Y-102853983D01"
  },
  {
    label: "LineDraw3770",
    equation: "X76774333Y-102847707D01"
  },
  {
    label: "LineDraw3771",
    equation: "X76792081Y-102839012D01"
  },
  {
    label: "LineDraw3772",
    equation: "X76810922Y-102831552D01"
  },
  {
    label: "LineDraw3773",
    equation: "X76846692Y-102805564D01"
  },
  {
    label: "LineDraw3774",
    equation: "X76856612Y-102799048D01"
  },
  {
    label: "LineDraw3775",
    equation: "X76887840Y-102780580D01"
  },
  {
    label: "LineDraw3776",
    equation: "X76887843Y-102780578D01"
  },
  {
    label: "LineDraw3777",
    equation: "X76894667Y-102776542D01"
  },
  {
    label: "LineDraw3778",
    equation: "X76908988Y-102762221D01"
  },
  {
    label: "LineDraw3779",
    equation: "X76924022Y-102749380D01"
  },
  {
    label: "LineDraw3780",
    equation: "X76933999Y-102742131D01"
  },
  {
    label: "LineDraw3781",
    equation: "X76940412Y-102737472D01"
  },
  {
    label: "LineDraw3782",
    equation: "X76968603Y-102703395D01"
  },
  {
    label: "LineDraw3783",
    equation: "X76976593Y-102694616D01"
  },
  {
    label: "LineDraw3784",
    equation: "X80665805Y-99005405D01"
  },
  {
    label: "LineDraw3785",
    equation: "X80728117Y-98971379D01"
  },
  {
    label: "LineDraw3786",
    equation: "X80754900Y-98968500D01"
  },
  {
    label: "LineDraw3787",
    equation: "X98519233Y-98968500D01"
  },
  {
    label: "LineDraw3788",
    equation: "X98530416Y-98969027D01"
  },
  {
    label: "LineDraw3789",
    equation: "X98537909Y-98970702D01"
  },
  {
    label: "LineDraw3790",
    equation: "X98545835Y-98970453D01"
  },
  {
    label: "LineDraw3791",
    equation: "X98545836Y-98970453D01"
  },
  {
    label: "LineDraw3792",
    equation: "X98605986Y-98968562D01"
  },
  {
    label: "LineDraw3793",
    equation: "X98609945Y-98968500D01"
  },
  {
    label: "LineDraw3794",
    equation: "X98637856Y-98968500D01"
  },
  {
    label: "LineDraw3795",
    equation: "X98641791Y-98968003D01"
  },
  {
    label: "LineDraw3796",
    equation: "X98641856Y-98967995D01"
  },
  {
    label: "LineDraw3797",
    equation: "X98653693Y-98967062D01"
  },
  {
    label: "LineDraw3798",
    equation: "X98685951Y-98966048D01"
  },
  {
    label: "LineDraw3799",
    equation: "X98689970Y-98965922D01"
  },
  {
    label: "LineDraw3800",
    equation: "X98697889Y-98965673D01"
  },
  {
    label: "LineDraw3801",
    equation: "X98717343Y-98960021D01"
  },
  {
    label: "LineDraw3802",
    equation: "X98736700Y-98956013D01"
  },
  {
    label: "LineDraw3803",
    equation: "X98748930Y-98954468D01"
  },
  {
    label: "LineDraw3804",
    equation: "X98748931Y-98954468D01"
  },
  {
    label: "LineDraw3805",
    equation: "X98756797Y-98953474D01"
  },
  {
    label: "LineDraw3806",
    equation: "X98764168Y-98950555D01"
  },
  {
    label: "LineDraw3807",
    equation: "X98764170Y-98950555D01"
  },
  {
    label: "LineDraw3808",
    equation: "X98797912Y-98937196D01"
  },
  {
    label: "LineDraw3809",
    equation: "X98809142Y-98933351D01"
  },
  {
    label: "LineDraw3810",
    equation: "X98843983Y-98923229D01"
  },
  {
    label: "LineDraw3811",
    equation: "X98843984Y-98923229D01"
  },
  {
    label: "LineDraw3812",
    equation: "X98851593Y-98921018D01"
  },
  {
    label: "LineDraw3813",
    equation: "X98858412Y-98916985D01"
  },
  {
    label: "LineDraw3814",
    equation: "X98858417Y-98916983D01"
  },
  {
    label: "LineDraw3815",
    equation: "X98869028Y-98910707D01"
  },
  {
    label: "LineDraw3816",
    equation: "X98886776Y-98902012D01"
  },
  {
    label: "LineDraw3817",
    equation: "X98905617Y-98894552D01"
  },
  {
    label: "LineDraw3818",
    equation: "X98941387Y-98868564D01"
  },
  {
    label: "LineDraw3819",
    equation: "X98951307Y-98862048D01"
  },
  {
    label: "LineDraw3820",
    equation: "X98982535Y-98843580D01"
  },
  {
    label: "LineDraw3821",
    equation: "X98982538Y-98843578D01"
  },
  {
    label: "LineDraw3822",
    equation: "X98989362Y-98839542D01"
  },
  {
    label: "LineDraw3823",
    equation: "X99003683Y-98825221D01"
  },
  {
    label: "LineDraw3824",
    equation: "X99018717Y-98812380D01"
  },
  {
    label: "LineDraw3825",
    equation: "X99028694Y-98805131D01"
  },
  {
    label: "LineDraw3826",
    equation: "X99035107Y-98800472D01"
  },
  {
    label: "LineDraw3827",
    equation: "X99063298Y-98766395D01"
  },
  {
    label: "LineDraw3828",
    equation: "X99071288Y-98757616D01"
  },
  {
    label: "LineDraw3829",
    equation: "X102087177Y-95741727D01"
  },
  {
    label: "LineDraw3830",
    equation: "X102149489Y-95707701D01"
  },
  {
    label: "LineDraw3831",
    equation: "X102164837Y-95705343D01"
  },
  {
    label: "LineDraw3832",
    equation: "X102190600Y-95702998D01"
  },
  {
    label: "LineDraw3833",
    equation: "X102197302Y-95700820D01"
  },
  {
    label: "LineDraw3834",
    equation: "X102197304Y-95700820D01"
  },
  {
    label: "LineDraw3835",
    equation: "X102356409Y-95649124D01"
  },
  {
    label: "LineDraw3836",
    equation: "X102356412Y-95649123D01"
  },
  {
    label: "LineDraw3837",
    equation: "X102363108Y-95646947D01"
  },
  {
    label: "LineDraw3838",
    equation: "X102486335Y-95573489D01"
  },
  {
    label: "LineDraw3839",
    equation: "X102512860Y-95557677D01"
  },
  {
    label: "LineDraw3840",
    equation: "X102512862Y-95557676D01"
  },
  {
    label: "LineDraw3841",
    equation: "X102518912Y-95554069D01"
  },
  {
    label: "LineDraw3842",
    equation: "X102650266Y-95428982D01"
  },
  {
    label: "LineDraw3843",
    equation: "X102750643Y-95277902D01"
  },
  {
    label: "LineDraw3844",
    equation: "X102815055Y-95108338D01"
  },
  {
    label: "LineDraw3845",
    equation: "X102816559Y-95097639D01"
  },
  {
    label: "LineDraw3846",
    equation: "X102839748Y-94932639D01"
  },
  {
    label: "LineDraw3847",
    equation: "X102839748Y-94932636D01"
  },
  {
    label: "LineDraw3848",
    equation: "X102840299Y-94928717D01"
  },
  {
    label: "LineDraw3849",
    equation: "X102840616Y-94906000D01"
  },
  {
    label: "LineDraw3850",
    equation: "X102820397Y-94725745D01"
  },
  {
    label: "LineDraw3851",
    equation: "X102818080Y-94719091D01"
  },
  {
    label: "LineDraw3852",
    equation: "X102763064Y-94561106D01"
  },
  {
    label: "LineDraw3853",
    equation: "X102763062Y-94561103D01"
  },
  {
    label: "LineDraw3854",
    equation: "X102760745Y-94554448D01"
  },
  {
    label: "LineDraw3855",
    equation: "X102664626Y-94400624D01"
  },
  {
    label: "LineDraw3856",
    equation: "X102650941Y-94386843D01"
  },
  {
    label: "LineDraw3857",
    equation: "X102541778Y-94276915D01"
  },
  {
    label: "LineDraw3858",
    equation: "X102541774Y-94276912D01"
  },
  {
    label: "LineDraw3859",
    equation: "X102536815Y-94271918D01"
  },
  {
    label: "LineDraw3860",
    equation: "X102525697Y-94264862D01"
  },
  {
    label: "LineDraw3861",
    equation: "X102453910Y-94219305D01"
  },
  {
    label: "LineDraw3862",
    equation: "X102383666Y-94174727D01"
  },
  {
    label: "LineDraw3863",
    equation: "X102354463Y-94164328D01"
  },
  {
    label: "LineDraw3864",
    equation: "X102219425Y-94116243D01"
  },
  {
    label: "LineDraw3865",
    equation: "X102219420Y-94116242D01"
  },
  {
    label: "LineDraw3866",
    equation: "X102212790Y-94113881D01"
  },
  {
    label: "LineDraw3867",
    equation: "X102205802Y-94113048D01"
  },
  {
    label: "LineDraw3868",
    equation: "X102205799Y-94113047D01"
  },
  {
    label: "LineDraw3869",
    equation: "X102082698Y-94098368D01"
  },
  {
    label: "LineDraw3870",
    equation: "X102032680Y-94092404D01"
  },
  {
    label: "LineDraw3871",
    equation: "X102025677Y-94093140D01"
  },
  {
    label: "LineDraw3872",
    equation: "X102025676Y-94093140D01"
  },
  {
    label: "LineDraw3873",
    equation: "X101859288Y-94110628D01"
  },
  {
    label: "LineDraw3874",
    equation: "X101859286Y-94110629D01"
  },
  {
    label: "LineDraw3875",
    equation: "X101852288Y-94111364D01"
  },
  {
    label: "LineDraw3876",
    equation: "X101680579Y-94169818D01"
  },
  {
    label: "LineDraw3877",
    equation: "X101674575Y-94173512D01"
  },
  {
    label: "LineDraw3878",
    equation: "X101532095Y-94261166D01"
  },
  {
    label: "LineDraw3879",
    equation: "X101532092Y-94261168D01"
  },
  {
    label: "LineDraw3880",
    equation: "X101526088Y-94264862D01"
  },
  {
    label: "LineDraw3881",
    equation: "X101521053Y-94269793D01"
  },
  {
    label: "LineDraw3882",
    equation: "X101521050Y-94269795D01"
  },
  {
    label: "LineDraw3883",
    equation: "X101401525Y-94386843D01"
  },
  {
    label: "LineDraw3884",
    equation: "X101396493Y-94391771D01"
  },
  {
    label: "LineDraw3885",
    equation: "X101298235Y-94544238D01"
  },
  {
    label: "LineDraw3886",
    equation: "X101295826Y-94550858D01"
  },
  {
    label: "LineDraw3887",
    equation: "X101295824Y-94550861D01"
  },
  {
    label: "LineDraw3888",
    equation: "X101243957Y-94693365D01"
  },
  {
    label: "LineDraw3889",
    equation: "X101236197Y-94714685D01"
  },
  {
    label: "LineDraw3890",
    equation: "X101229137Y-94770568D01"
  },
  {
    label: "LineDraw3891",
    equation: "X101200757Y-94835641D01"
  },
  {
    label: "LineDraw3892",
    equation: "X101193227Y-94843868D01"
  },
  {
    label: "LineDraw3893",
    equation: "X98372500Y-97664595D01"
  },
  {
    label: "LineDraw3894",
    equation: "X98310188Y-97698621D01"
  },
  {
    label: "LineDraw3895",
    equation: "X98283405Y-97701500D01"
  },
  {
    label: "LineDraw3896",
    equation: "X80519072Y-97701500D01"
  },
  {
    label: "LineDraw3897",
    equation: "X80507889Y-97700973D01"
  },
  {
    label: "LineDraw3898",
    equation: "X80500396Y-97699298D01"
  },
  {
    label: "LineDraw3899",
    equation: "X80492470Y-97699547D01"
  },
  {
    label: "LineDraw3900",
    equation: "X80492469Y-97699547D01"
  },
  {
    label: "LineDraw3901",
    equation: "X80432306Y-97701438D01"
  },
  {
    label: "LineDraw3902",
    equation: "X80428348Y-97701500D01"
  },
  {
    label: "LineDraw3903",
    equation: "X80400449Y-97701500D01"
  },
  {
    label: "LineDraw3904",
    equation: "X80396459Y-97702004D01"
  },
  {
    label: "LineDraw3905",
    equation: "X80384625Y-97702936D01"
  },
  {
    label: "LineDraw3906",
    equation: "X80340416Y-97704326D01"
  },
  {
    label: "LineDraw3907",
    equation: "X80332802Y-97706538D01"
  },
  {
    label: "LineDraw3908",
    equation: "X80332797Y-97706539D01"
  },
  {
    label: "LineDraw3909",
    equation: "X80320964Y-97709977D01"
  },
  {
    label: "LineDraw3910",
    equation: "X80301601Y-97713988D01"
  },
  {
    label: "LineDraw3911",
    equation: "X80281508Y-97716526D01"
  },
  {
    label: "LineDraw3912",
    equation: "X80274141Y-97719443D01"
  },
  {
    label: "LineDraw3913",
    equation: "X80274136Y-97719444D01"
  },
  {
    label: "LineDraw3914",
    equation: "X80240397Y-97732802D01"
  },
  {
    label: "LineDraw3915",
    equation: "X80229170Y-97736646D01"
  },
  {
    label: "LineDraw3916",
    equation: "X80186712Y-97748982D01"
  },
  {
    label: "LineDraw3917",
    equation: "X80179886Y-97753019D01"
  },
  {
    label: "LineDraw3918",
    equation: "X80169277Y-97759293D01"
  },
  {
    label: "LineDraw3919",
    equation: "X80151529Y-97767988D01"
  },
  {
    label: "LineDraw3920",
    equation: "X80132688Y-97775448D01"
  },
  {
    label: "LineDraw3921",
    equation: "X80126272Y-97780110D01"
  },
  {
    label: "LineDraw3922",
    equation: "X80126271Y-97780110D01"
  },
  {
    label: "LineDraw3923",
    equation: "X80096918Y-97801436D01"
  },
  {
    label: "LineDraw3924",
    equation: "X80086998Y-97807952D01"
  },
  {
    label: "LineDraw3925",
    equation: "X80055770Y-97826420D01"
  },
  {
    label: "LineDraw3926",
    equation: "X80055767Y-97826422D01"
  },
  {
    label: "LineDraw3927",
    equation: "X80048943Y-97830458D01"
  },
  {
    label: "LineDraw3928",
    equation: "X80034622Y-97844779D01"
  },
  {
    label: "LineDraw3929",
    equation: "X80019589Y-97857619D01"
  },
  {
    label: "LineDraw3930",
    equation: "X80003198Y-97869528D01"
  },
  {
    label: "LineDraw3931",
    equation: "X79975007Y-97903605D01"
  },
  {
    label: "LineDraw3932",
    equation: "X79967017Y-97912384D01"
  },
  {
    label: "LineDraw3933",
    equation: "X76278587Y-101600813D01"
  },
  {
    label: "LineDraw3934",
    equation: "X76216275Y-101634839D01"
  },
  {
    label: "LineDraw3935",
    equation: "X76181816Y-101636908D01"
  },
  {
    label: "LineDraw3936",
    equation: "X76179091Y-101636299D01"
  },
  {
    label: "LineDraw3937",
    equation: "X76111033Y-101638438D01"
  },
  {
    label: "LineDraw3938",
    equation: "X76107075Y-101638500D01"
  },
  {
    label: "LineDraw3939",
    equation: "X76079144Y-101638500D01"
  },
  {
    label: "LineDraw3940",
    equation: "X76075229Y-101638995D01"
  },
  {
    label: "LineDraw3941",
    equation: "X76075225Y-101638995D01"
  },
  {
    label: "LineDraw3942",
    equation: "X76075167Y-101639003D01"
  },
  {
    label: "LineDraw3943",
    equation: "X76075138Y-101639006D01"
  },
  {
    label: "LineDraw3944",
    equation: "X76063296Y-101639939D01"
  },
  {
    label: "LineDraw3945",
    equation: "X76019110Y-101641327D01"
  },
  {
    label: "LineDraw3946",
    equation: "X76001744Y-101646372D01"
  },
  {
    label: "LineDraw3947",
    equation: "X75999658Y-101646978D01"
  },
  {
    label: "LineDraw3948",
    equation: "X75980306Y-101650986D01"
  },
  {
    label: "LineDraw3949",
    equation: "X75968068Y-101652532D01"
  },
  {
    label: "LineDraw3950",
    equation: "X75968066Y-101652533D01"
  },
  {
    label: "LineDraw3951",
    equation: "X75960203Y-101653526D01"
  },
  {
    label: "LineDraw3952",
    equation: "X75919086Y-101669806D01"
  },
  {
    label: "LineDraw3953",
    equation: "X75907885Y-101673641D01"
  },
  {
    label: "LineDraw3954",
    equation: "X75865406Y-101685982D01"
  },
  {
    label: "LineDraw3955",
    equation: "X75858587Y-101690015D01"
  },
  {
    label: "LineDraw3956",
    equation: "X75858582Y-101690017D01"
  },
  {
    label: "LineDraw3957",
    equation: "X75847971Y-101696293D01"
  },
  {
    label: "LineDraw3958",
    equation: "X75830221Y-101704990D01"
  },
  {
    label: "LineDraw3959",
    equation: "X75811383Y-101712448D01"
  },
  {
    label: "LineDraw3960",
    equation: "X75804967Y-101717109D01"
  },
  {
    label: "LineDraw3961",
    equation: "X75804966Y-101717110D01"
  },
  {
    label: "LineDraw3962",
    equation: "X75775625Y-101738428D01"
  },
  {
    label: "LineDraw3963",
    equation: "X75765701Y-101744947D01"
  },
  {
    label: "LineDraw3964",
    equation: "X75734460Y-101763422D01"
  },
  {
    label: "LineDraw3965",
    equation: "X75734455Y-101763426D01"
  },
  {
    label: "LineDraw3966",
    equation: "X75727637Y-101767458D01"
  },
  {
    label: "LineDraw3967",
    equation: "X75713313Y-101781782D01"
  },
  {
    label: "LineDraw3968",
    equation: "X75698281Y-101794621D01"
  },
  {
    label: "LineDraw3969",
    equation: "X75681893Y-101806528D01"
  },
  {
    label: "LineDraw3970",
    equation: "X75653712Y-101840593D01"
  },
  {
    label: "LineDraw3971",
    equation: "X75645722Y-101849373D01"
  },
  {
    label: "LineDraw3972",
    equation: "X67979747Y-109515348D01"
  },
  {
    label: "LineDraw3973",
    equation: "X67971461Y-109522888D01"
  },
  {
    label: "LineDraw3974",
    equation: "X67964982Y-109527000D01"
  },
  {
    label: "LineDraw3975",
    equation: "X67959557Y-109532777D01"
  },
  {
    label: "LineDraw3976",
    equation: "X67918357Y-109576651D01"
  },
  {
    label: "LineDraw3977",
    equation: "X67915602Y-109579493D01"
  },
  {
    label: "LineDraw3978",
    equation: "X67895865Y-109599230D01"
  },
  {
    label: "LineDraw3979",
    equation: "X67893385Y-109602427D01"
  },
  {
    label: "LineDraw3980",
    equation: "X67885682Y-109611447D01"
  },
  {
    label: "LineDraw3981",
    equation: "X67855414Y-109643679D01"
  },
  {
    label: "LineDraw3982",
    equation: "X67851595Y-109650625D01"
  },
  {
    label: "LineDraw3983",
    equation: "X67851593Y-109650628D01"
  },
  {
    label: "LineDraw3984",
    equation: "X67845652Y-109661434D01"
  },
  {
    label: "LineDraw3985",
    equation: "X67834801Y-109677953D01"
  },
  {
    label: "LineDraw3986",
    equation: "X67822386Y-109693959D01"
  },
  {
    label: "LineDraw3987",
    equation: "X67819241Y-109701228D01"
  },
  {
    label: "LineDraw3988",
    equation: "X67819238Y-109701232D01"
  },
  {
    label: "LineDraw3989",
    equation: "X67804826Y-109734537D01"
  },
  {
    label: "LineDraw3990",
    equation: "X67799609Y-109745187D01"
  },
  {
    label: "LineDraw3991",
    equation: "X67778305Y-109783940D01"
  },
  {
    label: "LineDraw3992",
    equation: "X67776334Y-109791615D01"
  },
  {
    label: "LineDraw3993",
    equation: "X67776334Y-109791616D01"
  },
  {
    label: "LineDraw3994",
    equation: "X67773267Y-109803562D01"
  },
  {
    label: "LineDraw3995",
    equation: "X67766863Y-109822266D01"
  },
  {
    label: "LineDraw3996",
    equation: "X67758819Y-109840855D01"
  },
  {
    label: "LineDraw3997",
    equation: "X67757580Y-109848678D01"
  },
  {
    label: "LineDraw3998",
    equation: "X67757577Y-109848688D01"
  },
  {
    label: "LineDraw3999",
    equation: "X67751901Y-109884524D01"
  },
  {
    label: "LineDraw4000",
    equation: "X67749495Y-109896144D01"
  },
  {
    label: "LineDraw4001",
    equation: "X67738500Y-109938970D01"
  },
  {
    label: "LineDraw4002",
    equation: "X67738500Y-109959224D01"
  },
  {
    label: "LineDraw4003",
    equation: "X67736949Y-109978934D01"
  },
  {
    label: "LineDraw4004",
    equation: "X67733780Y-109998943D01"
  },
  {
    label: "LineDraw4005",
    equation: "X67734526Y-110006835D01"
  },
  {
    label: "LineDraw4006",
    equation: "X67737941Y-110042961D01"
  },
  {
    label: "LineDraw4007",
    equation: "X67738500Y-110054819D01"
  },
  {
    label: "LineDraw4008",
    equation: "X67738500Y-126109331D01"
  },
  {
    label: "LineDraw4009",
    equation: "X67718411Y-126177586D01"
  },
  {
    label: "LineDraw4010",
    equation: "X67647054Y-126288310D01"
  },
  {
    label: "LineDraw4011",
    equation: "X67647050Y-126288319D01"
  },
  {
    label: "LineDraw4012",
    equation: "X67643235Y-126294238D01"
  },
  {
    label: "LineDraw4013",
    equation: "X67640826Y-126300858D01"
  },
  {
    label: "LineDraw4014",
    equation: "X67640825Y-126300859D01"
  },
  {
    label: "LineDraw4015",
    equation: "X67583607Y-126458062D01"
  },
  {
    label: "LineDraw4016",
    equation: "X67583606Y-126458067D01"
  },
  {
    label: "LineDraw4017",
    equation: "X67581197Y-126464685D01"
  },
  {
    label: "LineDraw4018",
    equation: "X67580927Y-126464587D01"
  },
  {
    label: "LineDraw4019",
    equation: "X67547369Y-126522801D01"
  },
  {
    label: "LineDraw4020",
    equation: "X67484286Y-126555376D01"
  },
  {
    label: "LineDraw4021",
    equation: "X67413607Y-126548675D01"
  },
  {
    label: "LineDraw4022",
    equation: "X67371263Y-126520764D01"
  },
  {
    label: "LineDraw4023",
    equation: "X55940611Y-115090112D01"
  },
  {
    label: "LineDraw4024",
    equation: "X55929744Y-115077721D01"
  },
  {
    label: "LineDraw4025",
    equation: "X55915309Y-115058909D01"
  },
  {
    label: "LineDraw4026",
    equation: "X55910283Y-115052359D01"
  },
  {
    label: "LineDraw4027",
    equation: "X55878371Y-115027872D01"
  },
  {
    label: "LineDraw4028",
    equation: "X55878368Y-115027869D01"
  },
  {
    label: "LineDraw4029",
    equation: "X55818397Y-114981851D01"
  },
  {
    label: "LineDraw4030",
    equation: "X55789725Y-114959850D01"
  },
  {
    label: "LineDraw4031",
    equation: "X55789723Y-114959849D01"
  },
  {
    label: "LineDraw4032",
    equation: "X55783172Y-114954822D01"
  },
  {
    label: "LineDraw4033",
    equation: "X55635147Y-114893508D01"
  },
  {
    label: "LineDraw4034",
    equation: "X55626960Y-114892430D01"
  },
  {
    label: "LineDraw4035",
    equation: "X55626959Y-114892430D01"
  },
  {
    label: "LineDraw4036",
    equation: "X55615754Y-114890955D01"
  },
  {
    label: "LineDraw4037",
    equation: "X55584558Y-114886848D01"
  },
  {
    label: "LineDraw4038",
    equation: "X55516181Y-114877846D01"
  },
  {
    label: "LineDraw4039",
    equation: "X55516178Y-114877846D01"
  },
  {
    label: "LineDraw4040",
    equation: "X55516170Y-114877845D01"
  },
  {
    label: "LineDraw4041",
    equation: "X55484485Y-114873674D01"
  },
  {
    label: "LineDraw4042",
    equation: "X55476296Y-114872596D01"
  },
  {
    label: "LineDraw4043",
    equation: "X55444603Y-114876768D01"
  },
  {
    label: "LineDraw4044",
    equation: "X55428160Y-114877846D01"
  },
  {
    label: "LineDraw4045",
    equation: "X53640846Y-114877846D01"
  },
  {
    label: "LineDraw4046",
    equation: "X53572725Y-114857844D01"
  },
  {
    label: "LineDraw4047",
    equation: "X53526232Y-114804188D01"
  },
  {
    label: "LineDraw4048",
    equation: "X53518642Y-114782542D01"
  },
  {
    label: "LineDraw4049",
    equation: "X53475016Y-114608862D01"
  },
  {
    label: "LineDraw4050",
    equation: "X53465431Y-114570702D01"
  },
  {
    label: "LineDraw4051",
    equation: "X53376354Y-114365840D01"
  },
  {
    label: "LineDraw4052",
    equation: "X53275611Y-114210115D01"
  },
  {
    label: "LineDraw4053",
    equation: "X53257822Y-114182617D01"
  },
  {
    label: "LineDraw4054",
    equation: "X53257820Y-114182614D01"
  },
  {
    label: "LineDraw4055",
    equation: "X53255014Y-114178277D01"
  },
  {
    label: "LineDraw4056",
    equation: "X53104670Y-114013051D01"
  },
  {
    label: "LineDraw4057",
    equation: "X53100619Y-114009852D01"
  },
  {
    label: "LineDraw4058",
    equation: "X53100615Y-114009848D01"
  },
  {
    label: "LineDraw4059",
    equation: "X52933414Y-113877800D01"
  },
  {
    label: "LineDraw4060",
    equation: "X52933410Y-113877798D01"
  },
  {
    label: "LineDraw4061",
    equation: "X52929359Y-113874598D01"
  },
  {
    label: "LineDraw4062",
    equation: "X52923744Y-113871498D01"
  },
  {
    label: "LineDraw4063",
    equation: "X52855129Y-113833621D01"
  },
  {
    label: "LineDraw4064",
    equation: "X52733789Y-113766638D01"
  },
  {
    label: "LineDraw4065",
    equation: "X52728920Y-113764914D01"
  },
  {
    label: "LineDraw4066",
    equation: "X52728916Y-113764912D01"
  },
  {
    label: "LineDraw4067",
    equation: "X52528087Y-113693795D01"
  },
  {
    label: "LineDraw4068",
    equation: "X52528083Y-113693794D01"
  },
  {
    label: "LineDraw4069",
    equation: "X52523212Y-113692069D01"
  },
  {
    label: "LineDraw4070",
    equation: "X52518119Y-113691162D01"
  },
  {
    label: "LineDraw4071",
    equation: "X52518116Y-113691161D01"
  },
  {
    label: "LineDraw4072",
    equation: "X52308373Y-113653800D01"
  },
  {
    label: "LineDraw4073",
    equation: "X52308367Y-113653799D01"
  },
  {
    label: "LineDraw4074",
    equation: "X52303284Y-113652894D01"
  },
  {
    label: "LineDraw4075",
    equation: "X52229452Y-113651992D01"
  },
  {
    label: "LineDraw4076",
    equation: "X52085081Y-113650228D01"
  },
  {
    label: "LineDraw4077",
    equation: "X52085079Y-113650228D01"
  },
  {
    label: "LineDraw4078",
    equation: "X52079911Y-113650165D01"
  },
  {
    label: "LineDraw4079",
    equation: "X51859091Y-113683955D01"
  },
  {
    label: "LineDraw4080",
    equation: "X51646756Y-113753357D01"
  },
  {
    label: "LineDraw4081",
    equation: "X51619570Y-113767509D01"
  },
  {
    label: "LineDraw4082",
    equation: "X51465101Y-113847921D01"
  },
  {
    label: "LineDraw4083",
    equation: "X51448607Y-113856507D01"
  },
  {
    label: "LineDraw4084",
    equation: "X51444474Y-113859610D01"
  },
  {
    label: "LineDraw4085",
    equation: "X51444471Y-113859612D01"
  },
  {
    label: "LineDraw4086",
    equation: "X51274100Y-113987530D01"
  },
  {
    label: "LineDraw4087",
    equation: "X51269965Y-113990635D01"
  },
  {
    label: "LineDraw4088",
    equation: "X51266393Y-113994373D01"
  },
  {
    label: "LineDraw4089",
    equation: "X51173911Y-114091150D01"
  },
  {
    label: "LineDraw4090",
    equation: "X51115629Y-114152138D01"
  },
  {
    label: "LineDraw4091",
    equation: "X51008201Y-114309621D01"
  },
  {
    label: "LineDraw4092",
    equation: "X50953293Y-114354621D01"
  },
  {
    label: "LineDraw4093",
    equation: "X50882768Y-114362792D01"
  },
  {
    label: "LineDraw4094",
    equation: "X50819021Y-114331538D01"
  },
  {
    label: "LineDraw4095",
    equation: "X50798324Y-114307054D01"
  },
  {
    label: "LineDraw4096",
    equation: "X50717822Y-114182617D01"
  },
  {
    label: "LineDraw4097",
    equation: "X50717820Y-114182614D01"
  },
  {
    label: "LineDraw4098",
    equation: "X50715014Y-114178277D01"
  },
  {
    label: "LineDraw4099",
    equation: "X50564670Y-114013051D01"
  },
  {
    label: "LineDraw4100",
    equation: "X50560619Y-114009852D01"
  },
  {
    label: "LineDraw4101",
    equation: "X50560615Y-114009848D01"
  },
  {
    label: "LineDraw4102",
    equation: "X50393414Y-113877800D01"
  },
  {
    label: "LineDraw4103",
    equation: "X50393410Y-113877798D01"
  },
  {
    label: "LineDraw4104",
    equation: "X50389359Y-113874598D01"
  },
  {
    label: "LineDraw4105",
    equation: "X50348053Y-113851796D01"
  },
  {
    label: "LineDraw4106",
    equation: "X50298084Y-113801364D01"
  },
  {
    label: "LineDraw4107",
    equation: "X50283312Y-113731921D01"
  },
  {
    label: "LineDraw4108",
    equation: "X50308428Y-113665516D01"
  },
  {
    label: "LineDraw4109",
    equation: "X50335780Y-113638909D01"
  },
  {
    label: "LineDraw4110",
    equation: "X50379603Y-113607650D01"
  },
  {
    label: "LineDraw4111",
    equation: "X50514860Y-113511173D01"
  },
  {
    label: "LineDraw4112",
    equation: "X50673096Y-113353489D01"
  },
  {
    label: "LineDraw4113",
    equation: "X50732594Y-113270689D01"
  },
  {
    label: "LineDraw4114",
    equation: "X50800435Y-113176277D01"
  },
  {
    label: "LineDraw4115",
    equation: "X50803453Y-113172077D01"
  },
  {
    label: "LineDraw4116",
    equation: "X50902430Y-112971811D01"
  },
  {
    label: "LineDraw4117",
    equation: "X50967370Y-112758069D01"
  },
  {
    label: "LineDraw4118",
    equation: "X50996529Y-112536590D01"
  },
  {
    label: "LineDraw4119",
    equation: "X50998156Y-112470000D01"
  },
  {
    label: "LineDraw4120",
    equation: "X50979852Y-112247361D01"
  },
  {
    label: "LineDraw4121",
    equation: "X50925431Y-112030702D01"
  },
  {
    label: "LineDraw4122",
    equation: "X50836354Y-111825840D01"
  },
  {
    label: "LineDraw4123",
    equation: "X50796906Y-111764862D01"
  },
  {
    label: "LineDraw4124",
    equation: "X50717822Y-111642617D01"
  },
  {
    label: "LineDraw4125",
    equation: "X50717820Y-111642614D01"
  },
  {
    label: "LineDraw4126",
    equation: "X50715014Y-111638277D01"
  },
  {
    label: "LineDraw4127",
    equation: "X50564670Y-111473051D01"
  },
  {
    label: "LineDraw4128",
    equation: "X50560619Y-111469852D01"
  },
  {
    label: "LineDraw4129",
    equation: "X50560615Y-111469848D01"
  },
  {
    label: "LineDraw4130",
    equation: "X50393414Y-111337800D01"
  },
  {
    label: "LineDraw4131",
    equation: "X50393410Y-111337798D01"
  },
  {
    label: "LineDraw4132",
    equation: "X50389359Y-111334598D01"
  },
  {
    label: "LineDraw4133",
    equation: "X50348053Y-111311796D01"
  },
  {
    label: "LineDraw4134",
    equation: "X50298084Y-111261364D01"
  },
  {
    label: "LineDraw4135",
    equation: "X50283312Y-111191921D01"
  },
  {
    label: "LineDraw4136",
    equation: "X50308428Y-111125516D01"
  },
  {
    label: "LineDraw4137",
    equation: "X50335780Y-111098909D01"
  },
  {
    label: "LineDraw4138",
    equation: "X50383285Y-111065024D01"
  },
  {
    label: "LineDraw4139",
    equation: "X50514860Y-110971173D01"
  },
  {
    label: "LineDraw4140",
    equation: "X50565722Y-110920489D01"
  },
  {
    label: "LineDraw4141",
    equation: "X50621133Y-110865271D01"
  },
  {
    label: "LineDraw4142",
    equation: "X50673096Y-110813489D01"
  },
  {
    label: "LineDraw4143",
    equation: "X50732594Y-110730689D01"
  },
  {
    label: "LineDraw4144",
    equation: "X50803453Y-110632077D01"
  },
  {
    label: "LineDraw4145",
    equation: "X50804776Y-110633028D01"
  },
  {
    label: "LineDraw4146",
    equation: "X50851645Y-110589857D01"
  },
  {
    label: "LineDraw4147",
    equation: "X50921580Y-110577625D01"
  },
  {
    label: "LineDraw4148",
    equation: "X50987026Y-110605144D01"
  },
  {
    label: "LineDraw4149",
    equation: "X51014875Y-110636994D01"
  },
  {
    label: "LineDraw4150",
    equation: "X51074987Y-110735088D01"
  },
  {
    label: "LineDraw4151",
    equation: "X51221250Y-110903938D01"
  },
  {
    label: "LineDraw4152",
    equation: "X51393126Y-111046632D01"
  },
  {
    label: "LineDraw4153",
    equation: "X51586000Y-111159338D01"
  },
  {
    label: "LineDraw4154",
    equation: "X51590825Y-111161180D01"
  },
  {
    label: "LineDraw4155",
    equation: "X51590826Y-111161181D01"
  },
  {
    label: "LineDraw4156",
    equation: "X51647307Y-111182749D01"
  },
  {
    label: "LineDraw4157",
    equation: "X51794692Y-111239030D01"
  },
  {
    label: "LineDraw4158",
    equation: "X51799760Y-111240061D01"
  },
  {
    label: "LineDraw4159",
    equation: "X51799763Y-111240062D01"
  },
  {
    label: "LineDraw4160",
    equation: "X51904466Y-111261364D01"
  },
  {
    label: "LineDraw4161",
    equation: "X52013597Y-111283567D01"
  },
  {
    label: "LineDraw4162",
    equation: "X52018772Y-111283757D01"
  },
  {
    label: "LineDraw4163",
    equation: "X52018774Y-111283757D01"
  },
  {
    label: "LineDraw4164",
    equation: "X52231673Y-111291564D01"
  },
  {
    label: "LineDraw4165",
    equation: "X52231677Y-111291564D01"
  },
  {
    label: "LineDraw4166",
    equation: "X52236837Y-111291753D01"
  },
  {
    label: "LineDraw4167",
    equation: "X52241957Y-111291097D01"
  },
  {
    label: "LineDraw4168",
    equation: "X52241959Y-111291097D01"
  },
  {
    label: "LineDraw4169",
    equation: "X52453288Y-111264025D01"
  },
  {
    label: "LineDraw4170",
    equation: "X52453289Y-111264025D01"
  },
  {
    label: "LineDraw4171",
    equation: "X52458416Y-111263368D01"
  },
  {
    label: "LineDraw4172",
    equation: "X52532702Y-111241081D01"
  },
  {
    label: "LineDraw4173",
    equation: "X52667429Y-111200661D01"
  },
  {
    label: "LineDraw4174",
    equation: "X52667434Y-111200659D01"
  },
  {
    label: "LineDraw4175",
    equation: "X52672384Y-111199174D01"
  },
  {
    label: "LineDraw4176",
    equation: "X52872994Y-111100896D01"
  },
  {
    label: "LineDraw4177",
    equation: "X53054860Y-110971173D01"
  },
  {
    label: "LineDraw4178",
    equation: "X53105722Y-110920489D01"
  },
  {
    label: "LineDraw4179",
    equation: "X53161133Y-110865271D01"
  },
  {
    label: "LineDraw4180",
    equation: "X53213096Y-110813489D01"
  },
  {
    label: "LineDraw4181",
    equation: "X53272594Y-110730689D01"
  },
  {
    label: "LineDraw4182",
    equation: "X53340435Y-110636277D01"
  },
  {
    label: "LineDraw4183",
    equation: "X53343453Y-110632077D01"
  },
  {
    label: "LineDraw4184",
    equation: "X53364320Y-110589857D01"
  },
  {
    label: "LineDraw4185",
    equation: "X53440136Y-110436453D01"
  },
  {
    label: "LineDraw4186",
    equation: "X53440137Y-110436451D01"
  },
  {
    label: "LineDraw4187",
    equation: "X53442430Y-110431811D01"
  },
  {
    label: "LineDraw4188",
    equation: "X53507370Y-110218069D01"
  },
  {
    label: "LineDraw4189",
    equation: "X53536529Y-109996590D01"
  },
  {
    label: "LineDraw4190",
    equation: "X53536950Y-109979364D01"
  },
  {
    label: "LineDraw4191",
    equation: "X53538074Y-109933365D01"
  },
  {
    label: "LineDraw4192",
    equation: "X53538074Y-109933361D01"
  },
  {
    label: "LineDraw4193",
    equation: "X53538156Y-109930000D01"
  },
  {
    label: "LineDraw4194",
    equation: "X53519852Y-109707361D01"
  },
  {
    label: "LineDraw4195",
    equation: "X53465431Y-109490702D01"
  },
  {
    label: "LineDraw4196",
    equation: "X53376354Y-109285840D01"
  },
  {
    label: "LineDraw4197",
    equation: "X53323498Y-109204137D01"
  },
  {
    label: "LineDraw4198",
    equation: "X53257822Y-109102617D01"
  },
  {
    label: "LineDraw4199",
    equation: "X53257820Y-109102614D01"
  },
  {
    label: "LineDraw4200",
    equation: "X53255014Y-109098277D01"
  },
  {
    label: "LineDraw4201",
    equation: "X53104670Y-108933051D01"
  },
  {
    label: "LineDraw4202",
    equation: "X53100619Y-108929852D01"
  },
  {
    label: "LineDraw4203",
    equation: "X53100615Y-108929848D01"
  },
  {
    label: "LineDraw4204",
    equation: "X52933414Y-108797800D01"
  },
  {
    label: "LineDraw4205",
    equation: "X52933410Y-108797798D01"
  },
  {
    label: "LineDraw4206",
    equation: "X52929359Y-108794598D01"
  },
  {
    label: "LineDraw4207",
    equation: "X52888053Y-108771796D01"
  },
  {
    label: "LineDraw4208",
    equation: "X52838084Y-108721364D01"
  },
  {
    label: "LineDraw4209",
    equation: "X52823312Y-108651921D01"
  },
  {
    label: "LineDraw4210",
    equation: "X52848428Y-108585516D01"
  },
  {
    label: "LineDraw4211",
    equation: "X52875780Y-108558909D01"
  },
  {
    label: "LineDraw4212",
    equation: "X52932365Y-108518547D01"
  },
  {
    label: "LineDraw4213",
    equation: "X53054860Y-108431173D01"
  },
  {
    label: "LineDraw4214",
    equation: "X53126381Y-108359902D01"
  },
  {
    label: "LineDraw4215",
    equation: "X53194961Y-108291561D01"
  },
  {
    label: "LineDraw4216",
    equation: "X53213096Y-108273489D01"
  },
  {
    label: "LineDraw4217",
    equation: "X53222185Y-108260841D01"
  },
  {
    label: "LineDraw4218",
    equation: "X53340435Y-108096277D01"
  },
  {
    label: "LineDraw4219",
    equation: "X53343453Y-108092077D01"
  },
  {
    label: "LineDraw4220",
    equation: "X53352253Y-108074273D01"
  },
  {
    label: "LineDraw4221",
    equation: "X53440136Y-107896453D01"
  },
  {
    label: "LineDraw4222",
    equation: "X53440137Y-107896451D01"
  },
  {
    label: "LineDraw4223",
    equation: "X53442430Y-107891811D01"
  },
  {
    label: "LineDraw4224",
    equation: "X53507370Y-107678069D01"
  },
  {
    label: "LineDraw4225",
    equation: "X53536529Y-107456590D01"
  },
  {
    label: "LineDraw4226",
    equation: "X53538156Y-107390000D01"
  },
  {
    label: "LineDraw4227",
    equation: "X53519852Y-107167361D01"
  },
  {
    label: "LineDraw4228",
    equation: "X53465431Y-106950702D01"
  },
  {
    label: "LineDraw4229",
    equation: "X53376354Y-106745840D01"
  },
  {
    label: "LineDraw4230",
    equation: "X53328426Y-106671754D01"
  },
  {
    label: "LineDraw4231",
    equation: "X53257822Y-106562617D01"
  },
  {
    label: "LineDraw4232",
    equation: "X53257820Y-106562614D01"
  },
  {
    label: "LineDraw4233",
    equation: "X53255014Y-106558277D01"
  },
  {
    label: "LineDraw4234",
    equation: "X53104670Y-106393051D01"
  },
  {
    label: "LineDraw4235",
    equation: "X53100619Y-106389852D01"
  },
  {
    label: "LineDraw4236",
    equation: "X53100615Y-106389848D01"
  },
  {
    label: "LineDraw4237",
    equation: "X52933414Y-106257800D01"
  },
  {
    label: "LineDraw4238",
    equation: "X52933410Y-106257798D01"
  },
  {
    label: "LineDraw4239",
    equation: "X52929359Y-106254598D01"
  },
  {
    label: "LineDraw4240",
    equation: "X52888053Y-106231796D01"
  },
  {
    label: "LineDraw4241",
    equation: "X52838084Y-106181364D01"
  },
  {
    label: "LineDraw4242",
    equation: "X52823312Y-106111921D01"
  },
  {
    label: "LineDraw4243",
    equation: "X52848428Y-106045516D01"
  },
  {
    label: "LineDraw4244",
    equation: "X52875780Y-106018909D01"
  },
  {
    label: "LineDraw4245",
    equation: "X52919603Y-105987650D01"
  },
  {
    label: "LineDraw4246",
    equation: "X53054860Y-105891173D01"
  },
  {
    label: "LineDraw4247",
    equation: "X53120636Y-105825627D01"
  },
  {
    label: "LineDraw4248",
    equation: "X53209435Y-105737137D01"
  },
  {
    label: "LineDraw4249",
    equation: "X53213096Y-105733489D01"
  },
  {
    label: "LineDraw4250",
    equation: "X53237308Y-105699795D01"
  },
  {
    label: "LineDraw4251",
    equation: "X53340435Y-105556277D01"
  },
  {
    label: "LineDraw4252",
    equation: "X53343453Y-105552077D01"
  },
  {
    label: "LineDraw4253",
    equation: "X53346337Y-105546243D01"
  },
  {
    label: "LineDraw4254",
    equation: "X53440136Y-105356453D01"
  },
  {
    label: "LineDraw4255",
    equation: "X53440137Y-105356451D01"
  },
  {
    label: "LineDraw4256",
    equation: "X53442430Y-105351811D01"
  },
  {
    label: "LineDraw4257",
    equation: "X53507370Y-105138069D01"
  },
  {
    label: "LineDraw4258",
    equation: "X53536529Y-104916590D01"
  },
  {
    label: "LineDraw4259",
    equation: "X53538156Y-104850000D01"
  },
  {
    label: "LineDraw4260",
    equation: "X53519852Y-104627361D01"
  },
  {
    label: "LineDraw4261",
    equation: "X53465431Y-104410702D01"
  },
  {
    label: "LineDraw4262",
    equation: "X53376354Y-104205840D01"
  },
  {
    label: "LineDraw4263",
    equation: "X53255014Y-104018277D01"
  },
  {
    label: "LineDraw4264",
    equation: "X53104670Y-103853051D01"
  },
  {
    label: "LineDraw4265",
    equation: "X53100619Y-103849852D01"
  },
  {
    label: "LineDraw4266",
    equation: "X53100615Y-103849848D01"
  },
  {
    label: "LineDraw4267",
    equation: "X52933414Y-103717800D01"
  },
  {
    label: "LineDraw4268",
    equation: "X52933410Y-103717798D01"
  },
  {
    label: "LineDraw4269",
    equation: "X52929359Y-103714598D01"
  },
  {
    label: "LineDraw4270",
    equation: "X52888053Y-103691796D01"
  },
  {
    label: "LineDraw4271",
    equation: "X52838084Y-103641364D01"
  },
  {
    label: "LineDraw4272",
    equation: "X52823312Y-103571921D01"
  },
  {
    label: "LineDraw4273",
    equation: "X52848428Y-103505516D01"
  },
  {
    label: "LineDraw4274",
    equation: "X52875780Y-103478909D01"
  },
  {
    label: "LineDraw4275",
    equation: "X52935134Y-103436572D01"
  },
  {
    label: "LineDraw4276",
    equation: "X53054860Y-103351173D01"
  },
  {
    label: "LineDraw4277",
    equation: "X53213096Y-103193489D01"
  },
  {
    label: "LineDraw4278",
    equation: "X53217380Y-103187528D01"
  },
  {
    label: "LineDraw4279",
    equation: "X53340435Y-103016277D01"
  },
  {
    label: "LineDraw4280",
    equation: "X53343453Y-103012077D01"
  },
  {
    label: "LineDraw4281",
    equation: "X53367826Y-102962763D01"
  },
  {
    label: "LineDraw4282",
    equation: "X53440136Y-102816453D01"
  },
  {
    label: "LineDraw4283",
    equation: "X53440137Y-102816451D01"
  },
  {
    label: "LineDraw4284",
    equation: "X53442430Y-102811811D01"
  },
  {
    label: "LineDraw4285",
    equation: "X53507370Y-102598069D01"
  },
  {
    label: "LineDraw4286",
    equation: "X53536529Y-102376590D01"
  },
  {
    label: "LineDraw4287",
    equation: "X53538156Y-102310000D01"
  },
  {
    label: "LineDraw4288",
    equation: "X53519852Y-102087361D01"
  },
  {
    label: "LineDraw4289",
    equation: "X53465431Y-101870702D01"
  },
  {
    label: "LineDraw4290",
    equation: "X53376354Y-101665840D01"
  },
  {
    label: "LineDraw4291",
    equation: "X53266754Y-101496424D01"
  },
  {
    label: "LineDraw4292",
    equation: "X53257822Y-101482617D01"
  },
  {
    label: "LineDraw4293",
    equation: "X53257820Y-101482614D01"
  },
  {
    label: "LineDraw4294",
    equation: "X53255014Y-101478277D01"
  },
  {
    label: "LineDraw4295",
    equation: "X53104670Y-101313051D01"
  },
  {
    label: "LineDraw4296",
    equation: "X53100619Y-101309852D01"
  },
  {
    label: "LineDraw4297",
    equation: "X53100615Y-101309848D01"
  },
  {
    label: "LineDraw4298",
    equation: "X52933414Y-101177800D01"
  },
  {
    label: "LineDraw4299",
    equation: "X52933410Y-101177798D01"
  },
  {
    label: "LineDraw4300",
    equation: "X52929359Y-101174598D01"
  },
  {
    label: "LineDraw4301",
    equation: "X52888053Y-101151796D01"
  },
  {
    label: "LineDraw4302",
    equation: "X52838084Y-101101364D01"
  },
  {
    label: "LineDraw4303",
    equation: "X52823312Y-101031921D01"
  },
  {
    label: "LineDraw4304",
    equation: "X52848428Y-100965516D01"
  },
  {
    label: "LineDraw4305",
    equation: "X52875780Y-100938909D01"
  },
  {
    label: "LineDraw4306",
    equation: "X52925717Y-100903289D01"
  },
  {
    label: "LineDraw4307",
    equation: "X53054860Y-100811173D01"
  },
  {
    label: "LineDraw4308",
    equation: "X53213096Y-100653489D01"
  },
  {
    label: "LineDraw4309",
    equation: "X53272594Y-100570689D01"
  },
  {
    label: "LineDraw4310",
    equation: "X53340435Y-100476277D01"
  },
  {
    label: "LineDraw4311",
    equation: "X53343453Y-100472077D01"
  },
  {
    label: "LineDraw4312",
    equation: "X53364320Y-100429857D01"
  },
  {
    label: "LineDraw4313",
    equation: "X53440136Y-100276453D01"
  },
  {
    label: "LineDraw4314",
    equation: "X53440137Y-100276451D01"
  },
  {
    label: "LineDraw4315",
    equation: "X53442430Y-100271811D01"
  },
  {
    label: "LineDraw4316",
    equation: "X53507370Y-100058069D01"
  },
  {
    label: "LineDraw4317",
    equation: "X53536529Y-99836590D01"
  },
  {
    label: "LineDraw4318",
    equation: "X53538156Y-99770000D01"
  },
  {
    label: "LineDraw4319",
    equation: "X53519852Y-99547361D01"
  },
  {
    label: "LineDraw4320",
    equation: "X53465431Y-99330702D01"
  },
  {
    label: "LineDraw4321",
    equation: "X53376354Y-99125840D01"
  },
  {
    label: "LineDraw4322",
    equation: "X53274928Y-98969059D01"
  },
  {
    label: "LineDraw4323",
    equation: "X53257822Y-98942617D01"
  },
  {
    label: "LineDraw4324",
    equation: "X53257820Y-98942614D01"
  },
  {
    label: "LineDraw4325",
    equation: "X53255014Y-98938277D01"
  },
  {
    label: "LineDraw4326",
    equation: "X53104670Y-98773051D01"
  },
  {
    label: "LineDraw4327",
    equation: "X53100619Y-98769852D01"
  },
  {
    label: "LineDraw4328",
    equation: "X53100615Y-98769848D01"
  },
  {
    label: "LineDraw4329",
    equation: "X52933414Y-98637800D01"
  },
  {
    label: "LineDraw4330",
    equation: "X52933410Y-98637798D01"
  },
  {
    label: "LineDraw4331",
    equation: "X52929359Y-98634598D01"
  },
  {
    label: "LineDraw4332",
    equation: "X52888053Y-98611796D01"
  },
  {
    label: "LineDraw4333",
    equation: "X52838084Y-98561364D01"
  },
  {
    label: "LineDraw4334",
    equation: "X52823312Y-98491921D01"
  },
  {
    label: "LineDraw4335",
    equation: "X52848428Y-98425516D01"
  },
  {
    label: "LineDraw4336",
    equation: "X52875780Y-98398909D01"
  },
  {
    label: "LineDraw4337",
    equation: "X52919603Y-98367650D01"
  },
  {
    label: "LineDraw4338",
    equation: "X53054860Y-98271173D01"
  },
  {
    label: "LineDraw4339",
    equation: "X53213096Y-98113489D01"
  },
  {
    label: "LineDraw4340",
    equation: "X53272594Y-98030689D01"
  },
  {
    label: "LineDraw4341",
    equation: "X53340435Y-97936277D01"
  },
  {
    label: "LineDraw4342",
    equation: "X53343453Y-97932077D01"
  },
  {
    label: "LineDraw4343",
    equation: "X53364320Y-97889857D01"
  },
  {
    label: "LineDraw4344",
    equation: "X53440136Y-97736453D01"
  },
  {
    label: "LineDraw4345",
    equation: "X53440137Y-97736451D01"
  },
  {
    label: "LineDraw4346",
    equation: "X53442430Y-97731811D01"
  },
  {
    label: "LineDraw4347",
    equation: "X53507370Y-97518069D01"
  },
  {
    label: "LineDraw4348",
    equation: "X53536529Y-97296590D01"
  },
  {
    label: "LineDraw4349",
    equation: "X53538156Y-97230000D01"
  },
  {
    label: "LineDraw4350",
    equation: "X53519852Y-97007361D01"
  },
  {
    label: "LineDraw4351",
    equation: "X53465431Y-96790702D01"
  },
  {
    label: "LineDraw4352",
    equation: "X53376354Y-96585840D01"
  },
  {
    label: "LineDraw4353",
    equation: "X53255014Y-96398277D01"
  },
  {
    label: "LineDraw4354",
    equation: "X53104670Y-96233051D01"
  },
  {
    label: "LineDraw4355",
    equation: "X53100619Y-96229852D01"
  },
  {
    label: "LineDraw4356",
    equation: "X53100615Y-96229848D01"
  },
  {
    label: "LineDraw4357",
    equation: "X52933414Y-96097800D01"
  },
  {
    label: "LineDraw4358",
    equation: "X52933410Y-96097798D01"
  },
  {
    label: "LineDraw4359",
    equation: "X52929359Y-96094598D01"
  },
  {
    label: "LineDraw4360",
    equation: "X52733789Y-95986638D01"
  },
  {
    label: "LineDraw4361",
    equation: "X52728920Y-95984914D01"
  },
  {
    label: "LineDraw4362",
    equation: "X52728916Y-95984912D01"
  },
  {
    label: "LineDraw4363",
    equation: "X52528087Y-95913795D01"
  },
  {
    label: "LineDraw4364",
    equation: "X52528083Y-95913794D01"
  },
  {
    label: "LineDraw4365",
    equation: "X52523212Y-95912069D01"
  },
  {
    label: "LineDraw4366",
    equation: "X52518119Y-95911162D01"
  },
  {
    label: "LineDraw4367",
    equation: "X52518116Y-95911161D01"
  },
  {
    label: "LineDraw4368",
    equation: "X52308373Y-95873800D01"
  },
  {
    label: "LineDraw4369",
    equation: "X52308367Y-95873799D01"
  },
  {
    label: "LineDraw4370",
    equation: "X52303284Y-95872894D01"
  },
  {
    label: "LineDraw4371",
    equation: "X52229452Y-95871992D01"
  },
  {
    label: "LineDraw4372",
    equation: "X52085081Y-95870228D01"
  },
  {
    label: "LineDraw4373",
    equation: "X52085079Y-95870228D01"
  },
  {
    label: "LineDraw4374",
    equation: "X52079911Y-95870165D01"
  },
  {
    label: "LineDraw4375",
    equation: "X51859091Y-95903955D01"
  },
  {
    label: "LineDraw4376",
    equation: "X51646756Y-95973357D01"
  },
  {
    label: "LineDraw4377",
    equation: "X51448607Y-96076507D01"
  },
  {
    label: "LineDraw4378",
    equation: "X51444474Y-96079610D01"
  },
  {
    label: "LineDraw4379",
    equation: "X51444471Y-96079612D01"
  },
  {
    label: "LineDraw4380",
    equation: "X51420247Y-96097800D01"
  },
  {
    label: "LineDraw4381",
    equation: "X51269965Y-96210635D01"
  },
  {
    label: "LineDraw4382",
    equation: "X51115629Y-96372138D01"
  },
  {
    label: "LineDraw4383",
    equation: "X51008201Y-96529621D01"
  },
  {
    label: "LineDraw4384",
    equation: "X50953293Y-96574621D01"
  },
  {
    label: "LineDraw4385",
    equation: "X50882768Y-96582792D01"
  },
  {
    label: "LineDraw4386",
    equation: "X50819021Y-96551538D01"
  },
  {
    label: "LineDraw4387",
    equation: "X50798324Y-96527054D01"
  },
  {
    label: "LineDraw4388",
    equation: "X50717822Y-96402617D01"
  },
  {
    label: "LineDraw4389",
    equation: "X50717820Y-96402614D01"
  },
  {
    label: "LineDraw4390",
    equation: "X50715014Y-96398277D01"
  },
  {
    label: "LineDraw4391",
    equation: "X50564670Y-96233051D01"
  },
  {
    label: "LineDraw4392",
    equation: "X50560619Y-96229852D01"
  },
  {
    label: "LineDraw4393",
    equation: "X50560615Y-96229848D01"
  },
  {
    label: "LineDraw4394",
    equation: "X50393414Y-96097800D01"
  },
  {
    label: "LineDraw4395",
    equation: "X50393410Y-96097798D01"
  },
  {
    label: "LineDraw4396",
    equation: "X50389359Y-96094598D01"
  },
  {
    label: "LineDraw4397",
    equation: "X50348053Y-96071796D01"
  },
  {
    label: "LineDraw4398",
    equation: "X50298084Y-96021364D01"
  },
  {
    label: "LineDraw4399",
    equation: "X50283312Y-95951921D01"
  },
  {
    label: "LineDraw4400",
    equation: "X50308428Y-95885516D01"
  },
  {
    label: "LineDraw4401",
    equation: "X50335780Y-95858909D01"
  },
  {
    label: "LineDraw4402",
    equation: "X50379603Y-95827650D01"
  },
  {
    label: "LineDraw4403",
    equation: "X50514860Y-95731173D01"
  },
  {
    label: "LineDraw4404",
    equation: "X50540784Y-95705340D01"
  },
  {
    label: "LineDraw4405",
    equation: "X50669435Y-95577137D01"
  },
  {
    label: "LineDraw4406",
    equation: "X50673096Y-95573489D01"
  },
  {
    label: "LineDraw4407",
    equation: "X50690542Y-95549211D01"
  },
  {
    label: "LineDraw4408",
    equation: "X50800435Y-95396277D01"
  },
  {
    label: "LineDraw4409",
    equation: "X50803453Y-95392077D01"
  },
  {
    label: "LineDraw4410",
    equation: "X50859882Y-95277902D01"
  },
  {
    label: "LineDraw4411",
    equation: "X50900136Y-95196453D01"
  },
  {
    label: "LineDraw4412",
    equation: "X50900137Y-95196451D01"
  },
  {
    label: "LineDraw4413",
    equation: "X50902430Y-95191811D01"
  },
  {
    label: "LineDraw4414",
    equation: "X50967370Y-94978069D01"
  },
  {
    label: "LineDraw4415",
    equation: "X50996529Y-94756590D01"
  },
  {
    label: "LineDraw4416",
    equation: "X50998156Y-94690000D01"
  },
  {
    label: "LineDraw4417",
    equation: "X50979852Y-94467361D01"
  },
  {
    label: "LineDraw4418",
    equation: "X50925431Y-94250702D01"
  },
  {
    label: "LineDraw4419",
    equation: "X50836354Y-94045840D01"
  },
  {
    label: "LineDraw4420",
    equation: "X50715014Y-93858277D01"
  },
  {
    label: "LineDraw4421",
    equation: "X50564670Y-93693051D01"
  },
  {
    label: "LineDraw4422",
    equation: "X50560619Y-93689852D01"
  },
  {
    label: "LineDraw4423",
    equation: "X50560615Y-93689848D01"
  },
  {
    label: "LineDraw4424",
    equation: "X50393414Y-93557800D01"
  },
  {
    label: "LineDraw4425",
    equation: "X50393410Y-93557798D01"
  },
  {
    label: "LineDraw4426",
    equation: "X50389359Y-93554598D01"
  },
  {
    label: "LineDraw4427",
    equation: "X50193789Y-93446638D01"
  },
  {
    label: "LineDraw4428",
    equation: "X50188920Y-93444914D01"
  },
  {
    label: "LineDraw4429",
    equation: "X50188916Y-93444912D01"
  },
  {
    label: "LineDraw4430",
    equation: "X49988087Y-93373795D01"
  },
  {
    label: "LineDraw4431",
    equation: "X49988083Y-93373794D01"
  },
  {
    label: "LineDraw4432",
    equation: "X49983212Y-93372069D01"
  },
  {
    label: "LineDraw4433",
    equation: "X49978119Y-93371162D01"
  },
  {
    label: "LineDraw4434",
    equation: "X49978116Y-93371161D01"
  },
  {
    label: "LineDraw4435",
    equation: "X49768373Y-93333800D01"
  },
  {
    label: "LineDraw4436",
    equation: "X49768367Y-93333799D01"
  },
  {
    label: "LineDraw4437",
    equation: "X49763284Y-93332894D01"
  },
  {
    label: "LineDraw4438",
    equation: "X49689452Y-93331992D01"
  },
  {
    label: "LineDraw4439",
    equation: "X49545081Y-93330228D01"
  },
  {
    label: "LineDraw4440",
    equation: "X49545079Y-93330228D01"
  },
  {
    label: "LineDraw4441",
    equation: "X49539911Y-93330165D01"
  },
  {
    label: "LineDraw4442",
    equation: "X49319091Y-93363955D01"
  },
  {
    label: "LineDraw4443",
    equation: "X49106756Y-93433357D01"
  },
  {
    label: "LineDraw4444",
    equation: "X48908607Y-93536507D01"
  },
  {
    label: "LineDraw4445",
    equation: "X48904474Y-93539610D01"
  },
  {
    label: "LineDraw4446",
    equation: "X48904471Y-93539612D01"
  },
  {
    label: "LineDraw4447",
    equation: "X48880247Y-93557800D01"
  },
  {
    label: "LineDraw4448",
    equation: "X48729965Y-93670635D01"
  },
  {
    label: "LineDraw4449",
    equation: "X48575629Y-93832138D01"
  },
  {
    label: "LineDraw4450",
    equation: "X48449743Y-94016680D01"
  },
  {
    label: "LineDraw4451",
    equation: "X48355688Y-94219305D01"
  },
  {
    label: "LineDraw4452",
    equation: "X48295989Y-94434570D01"
  },
  {
    label: "LineDraw4453",
    equation: "X48272251Y-94656695D01"
  },
  {
    label: "LineDraw4454",
    equation: "X48272548Y-94661848D01"
  },
  {
    label: "LineDraw4455",
    equation: "X48272548Y-94661851D01"
  },
  {
    label: "LineDraw4456",
    equation: "X48281284Y-94813364D01"
  },
  {
    label: "LineDraw4457",
    equation: "X48285110Y-94879715D01"
  },
  {
    label: "LineDraw4458",
    equation: "X48286247Y-94884761D01"
  },
  {
    label: "LineDraw4459",
    equation: "X48286248Y-94884767D01"
  },
  {
    label: "LineDraw4460",
    equation: "X48296153Y-94928717D01"
  },
  {
    label: "LineDraw4461",
    equation: "X48334222Y-95097639D01"
  },
  {
    label: "LineDraw4462",
    equation: "X48372461Y-95191811D01"
  },
  {
    label: "LineDraw4463",
    equation: "X48409803Y-95283773D01"
  },
  {
    label: "LineDraw4464",
    equation: "X48418266Y-95304616D01"
  },
  {
    label: "LineDraw4465",
    equation: "X48420965Y-95309020D01"
  },
  {
    label: "LineDraw4466",
    equation: "X48490880Y-95423111D01"
  },
  {
    label: "LineDraw4467",
    equation: "X48534987Y-95495088D01"
  },
  {
    label: "LineDraw4468",
    equation: "X48681250Y-95663938D01"
  },
  {
    label: "LineDraw4469",
    equation: "X48853126Y-95806632D01"
  },
  {
    label: "LineDraw4470",
    equation: "X48923595Y-95847811D01"
  },
  {
    label: "LineDraw4471",
    equation: "X48926445Y-95849476D01"
  },
  {
    label: "LineDraw4472",
    equation: "X48975169Y-95901114D01"
  },
  {
    label: "LineDraw4473",
    equation: "X48988240Y-95970897D01"
  },
  {
    label: "LineDraw4474",
    equation: "X48961509Y-96036669D01"
  },
  {
    label: "LineDraw4475",
    equation: "X48921055Y-96070027D01"
  },
  {
    label: "LineDraw4476",
    equation: "X48908607Y-96076507D01"
  },
  {
    label: "LineDraw4477",
    equation: "X48904474Y-96079610D01"
  },
  {
    label: "LineDraw4478",
    equation: "X48904471Y-96079612D01"
  },
  {
    label: "LineDraw4479",
    equation: "X48880247Y-96097800D01"
  },
  {
    label: "LineDraw4480",
    equation: "X48729965Y-96210635D01"
  },
  {
    label: "LineDraw4481",
    equation: "X48575629Y-96372138D01"
  },
  {
    label: "LineDraw4482",
    equation: "X48449743Y-96556680D01"
  },
  {
    label: "LineDraw4483",
    equation: "X48355688Y-96759305D01"
  },
  {
    label: "LineDraw4484",
    equation: "X48295989Y-96974570D01"
  },
  {
    label: "LineDraw4485",
    equation: "X48272251Y-97196695D01"
  },
  {
    label: "LineDraw4486",
    equation: "X48272548Y-97201848D01"
  },
  {
    label: "LineDraw4487",
    equation: "X48272548Y-97201851D01"
  },
  {
    label: "LineDraw4488",
    equation: "X48278011Y-97296590D01"
  },
  {
    label: "LineDraw4489",
    equation: "X48285110Y-97419715D01"
  },
  {
    label: "LineDraw4490",
    equation: "X48286247Y-97424761D01"
  },
  {
    label: "LineDraw4491",
    equation: "X48286248Y-97424767D01"
  },
  {
    label: "LineDraw4492",
    equation: "X48306119Y-97512939D01"
  },
  {
    label: "LineDraw4493",
    equation: "X48334222Y-97637639D01"
  },
  {
    label: "LineDraw4494",
    equation: "X48418266Y-97844616D01"
  },
  {
    label: "LineDraw4495",
    equation: "X48457214Y-97908173D01"
  },
  {
    label: "LineDraw4496",
    equation: "X48532291Y-98030688D01"
  },
  {
    label: "LineDraw4497",
    equation: "X48534987Y-98035088D01"
  },
  {
    label: "LineDraw4498",
    equation: "X48681250Y-98203938D01"
  },
  {
    label: "LineDraw4499",
    equation: "X48853126Y-98346632D01"
  },
  {
    label: "LineDraw4500",
    equation: "X48923595Y-98387811D01"
  },
  {
    label: "LineDraw4501",
    equation: "X48926445Y-98389476D01"
  },
  {
    label: "LineDraw4502",
    equation: "X48975169Y-98441114D01"
  },
  {
    label: "LineDraw4503",
    equation: "X48988240Y-98510897D01"
  },
  {
    label: "LineDraw4504",
    equation: "X48961509Y-98576669D01"
  },
  {
    label: "LineDraw4505",
    equation: "X48921055Y-98610027D01"
  },
  {
    label: "LineDraw4506",
    equation: "X48908607Y-98616507D01"
  },
  {
    label: "LineDraw4507",
    equation: "X48904474Y-98619610D01"
  },
  {
    label: "LineDraw4508",
    equation: "X48904471Y-98619612D01"
  },
  {
    label: "LineDraw4509",
    equation: "X48880247Y-98637800D01"
  },
  {
    label: "LineDraw4510",
    equation: "X48729965Y-98750635D01"
  },
  {
    label: "LineDraw4511",
    equation: "X48726393Y-98754373D01"
  },
  {
    label: "LineDraw4512",
    equation: "X48592435Y-98894552D01"
  },
  {
    label: "LineDraw4513",
    equation: "X48575629Y-98912138D01"
  },
  {
    label: "LineDraw4514",
    equation: "X48572720Y-98916403D01"
  },
  {
    label: "LineDraw4515",
    equation: "X48572714Y-98916411D01"
  },
  {
    label: "LineDraw4516",
    equation: "X48512007Y-99005405D01"
  },
  {
    label: "LineDraw4517",
    equation: "X48449743Y-99096680D01"
  },
  {
    label: "LineDraw4518",
    equation: "X48355688Y-99299305D01"
  },
  {
    label: "LineDraw4519",
    equation: "X48295989Y-99514570D01"
  },
  {
    label: "LineDraw4520",
    equation: "X48272251Y-99736695D01"
  },
  {
    label: "LineDraw4521",
    equation: "X48272548Y-99741848D01"
  },
  {
    label: "LineDraw4522",
    equation: "X48272548Y-99741851D01"
  },
  {
    label: "LineDraw4523",
    equation: "X48278011Y-99836590D01"
  },
  {
    label: "LineDraw4524",
    equation: "X48285110Y-99959715D01"
  },
  {
    label: "LineDraw4525",
    equation: "X48286247Y-99964761D01"
  },
  {
    label: "LineDraw4526",
    equation: "X48286248Y-99964767D01"
  },
  {
    label: "LineDraw4527",
    equation: "X48306119Y-100052939D01"
  },
  {
    label: "LineDraw4528",
    equation: "X48334222Y-100177639D01"
  },
  {
    label: "LineDraw4529",
    equation: "X48371209Y-100268727D01"
  },
  {
    label: "LineDraw4530",
    equation: "X48412703Y-100370915D01"
  },
  {
    label: "LineDraw4531",
    equation: "X48418266Y-100384616D01"
  },
  {
    label: "LineDraw4532",
    equation: "X48469019Y-100467438D01"
  },
  {
    label: "LineDraw4533",
    equation: "X48532291Y-100570688D01"
  },
  {
    label: "LineDraw4534",
    equation: "X48534987Y-100575088D01"
  },
  {
    label: "LineDraw4535",
    equation: "X48681250Y-100743938D01"
  },
  {
    label: "LineDraw4536",
    equation: "X48853126Y-100886632D01"
  },
  {
    label: "LineDraw4537",
    equation: "X49046000Y-100999338D01"
  },
  {
    label: "LineDraw4538",
    equation: "X49254692Y-101079030D01"
  },
  {
    label: "LineDraw4539",
    equation: "X49259760Y-101080061D01"
  },
  {
    label: "LineDraw4540",
    equation: "X49259763Y-101080062D01"
  },
  {
    label: "LineDraw4541",
    equation: "X49364466Y-101101364D01"
  },
  {
    label: "LineDraw4542",
    equation: "X49473597Y-101123567D01"
  },
  {
    label: "LineDraw4543",
    equation: "X49478772Y-101123757D01"
  },
  {
    label: "LineDraw4544",
    equation: "X49478774Y-101123757D01"
  },
  {
    label: "LineDraw4545",
    equation: "X49691673Y-101131564D01"
  },
  {
    label: "LineDraw4546",
    equation: "X49691677Y-101131564D01"
  },
  {
    label: "LineDraw4547",
    equation: "X49696837Y-101131753D01"
  },
  {
    label: "LineDraw4548",
    equation: "X49701957Y-101131097D01"
  },
  {
    label: "LineDraw4549",
    equation: "X49701959Y-101131097D01"
  },
  {
    label: "LineDraw4550",
    equation: "X49913288Y-101104025D01"
  },
  {
    label: "LineDraw4551",
    equation: "X49913289Y-101104025D01"
  },
  {
    label: "LineDraw4552",
    equation: "X49918416Y-101103368D01"
  },
  {
    label: "LineDraw4553",
    equation: "X49925096Y-101101364D01"
  },
  {
    label: "LineDraw4554",
    equation: "X50127429Y-101040661D01"
  },
  {
    label: "LineDraw4555",
    equation: "X50127434Y-101040659D01"
  },
  {
    label: "LineDraw4556",
    equation: "X50132384Y-101039174D01"
  },
  {
    label: "LineDraw4557",
    equation: "X50332994Y-100940896D01"
  },
  {
    label: "LineDraw4558",
    equation: "X50514860Y-100811173D01"
  },
  {
    label: "LineDraw4559",
    equation: "X50673096Y-100653489D01"
  },
  {
    label: "LineDraw4560",
    equation: "X50732594Y-100570689D01"
  },
  {
    label: "LineDraw4561",
    equation: "X50803453Y-100472077D01"
  },
  {
    label: "LineDraw4562",
    equation: "X50804776Y-100473028D01"
  },
  {
    label: "LineDraw4563",
    equation: "X50851645Y-100429857D01"
  },
  {
    label: "LineDraw4564",
    equation: "X50921580Y-100417625D01"
  },
  {
    label: "LineDraw4565",
    equation: "X50987026Y-100445144D01"
  },
  {
    label: "LineDraw4566",
    equation: "X51014875Y-100476994D01"
  },
  {
    label: "LineDraw4567",
    equation: "X51074987Y-100575088D01"
  },
  {
    label: "LineDraw4568",
    equation: "X51221250Y-100743938D01"
  },
  {
    label: "LineDraw4569",
    equation: "X51393126Y-100886632D01"
  },
  {
    label: "LineDraw4570",
    equation: "X51421631Y-100903289D01"
  },
  {
    label: "LineDraw4571",
    equation: "X51466445Y-100929476D01"
  },
  {
    label: "LineDraw4572",
    equation: "X51515169Y-100981114D01"
  },
  {
    label: "LineDraw4573",
    equation: "X51528240Y-101050897D01"
  },
  {
    label: "LineDraw4574",
    equation: "X51501509Y-101116669D01"
  },
  {
    label: "LineDraw4575",
    equation: "X51461055Y-101150027D01"
  },
  {
    label: "LineDraw4576",
    equation: "X51448607Y-101156507D01"
  },
  {
    label: "LineDraw4577",
    equation: "X51444474Y-101159610D01"
  },
  {
    label: "LineDraw4578",
    equation: "X51444471Y-101159612D01"
  },
  {
    label: "LineDraw4579",
    equation: "X51422852Y-101175844D01"
  },
  {
    label: "LineDraw4580",
    equation: "X51269965Y-101290635D01"
  },
  {
    label: "LineDraw4581",
    equation: "X51115629Y-101452138D01"
  },
  {
    label: "LineDraw4582",
    equation: "X50989743Y-101636680D01"
  },
  {
    label: "LineDraw4583",
    equation: "X50974369Y-101669801D01"
  },
  {
    label: "LineDraw4584",
    equation: "X50910903Y-101806528D01"
  },
  {
    label: "LineDraw4585",
    equation: "X50895688Y-101839305D01"
  },
  {
    label: "LineDraw4586",
    equation: "X50835989Y-102054570D01"
  },
  {
    label: "LineDraw4587",
    equation: "X50812251Y-102276695D01"
  },
  {
    label: "LineDraw4588",
    equation: "X50812548Y-102281848D01"
  },
  {
    label: "LineDraw4589",
    equation: "X50812548Y-102281851D01"
  },
  {
    label: "LineDraw4590",
    equation: "X50818011Y-102376590D01"
  },
  {
    label: "LineDraw4591",
    equation: "X50825110Y-102499715D01"
  },
  {
    label: "LineDraw4592",
    equation: "X50826247Y-102504761D01"
  },
  {
    label: "LineDraw4593",
    equation: "X50826248Y-102504767D01"
  },
  {
    label: "LineDraw4594",
    equation: "X50846119Y-102592939D01"
  },
  {
    label: "LineDraw4595",
    equation: "X50874222Y-102717639D01"
  },
  {
    label: "LineDraw4596",
    equation: "X50958266Y-102924616D01"
  },
  {
    label: "LineDraw4597",
    equation: "X51009019Y-103007438D01"
  },
  {
    label: "LineDraw4598",
    equation: "X51053002Y-103079211D01"
  },
  {
    label: "LineDraw4599",
    equation: "X51074987Y-103115088D01"
  },
  {
    label: "LineDraw4600",
    equation: "X51221250Y-103283938D01"
  },
  {
    label: "LineDraw4601",
    equation: "X51393126Y-103426632D01"
  },
  {
    label: "LineDraw4602",
    equation: "X51421351Y-103443125D01"
  },
  {
    label: "LineDraw4603",
    equation: "X51466445Y-103469476D01"
  },
  {
    label: "LineDraw4604",
    equation: "X51515169Y-103521114D01"
  },
  {
    label: "LineDraw4605",
    equation: "X51528240Y-103590897D01"
  },
  {
    label: "LineDraw4606",
    equation: "X51501509Y-103656669D01"
  },
  {
    label: "LineDraw4607",
    equation: "X51461055Y-103690027D01"
  },
  {
    label: "LineDraw4608",
    equation: "X51448607Y-103696507D01"
  },
  {
    label: "LineDraw4609",
    equation: "X51444474Y-103699610D01"
  },
  {
    label: "LineDraw4610",
    equation: "X51444471Y-103699612D01"
  },
  {
    label: "LineDraw4611",
    equation: "X51274100Y-103827530D01"
  },
  {
    label: "LineDraw4612",
    equation: "X51269965Y-103830635D01"
  },
  {
    label: "LineDraw4613",
    equation: "X51115629Y-103992138D01"
  },
  {
    label: "LineDraw4614",
    equation: "X51008201Y-104149621D01"
  },
  {
    label: "LineDraw4615",
    equation: "X50953293Y-104194621D01"
  },
  {
    label: "LineDraw4616",
    equation: "X50882768Y-104202792D01"
  },
  {
    label: "LineDraw4617",
    equation: "X50819021Y-104171538D01"
  },
  {
    label: "LineDraw4618",
    equation: "X50798324Y-104147054D01"
  },
  {
    label: "LineDraw4619",
    equation: "X50717822Y-104022617D01"
  },
  {
    label: "LineDraw4620",
    equation: "X50717820Y-104022614D01"
  },
  {
    label: "LineDraw4621",
    equation: "X50715014Y-104018277D01"
  },
  {
    label: "LineDraw4622",
    equation: "X50564670Y-103853051D01"
  },
  {
    label: "LineDraw4623",
    equation: "X50560619Y-103849852D01"
  },
  {
    label: "LineDraw4624",
    equation: "X50560615Y-103849848D01"
  },
  {
    label: "LineDraw4625",
    equation: "X50393414Y-103717800D01"
  },
  {
    label: "LineDraw4626",
    equation: "X50393410Y-103717798D01"
  },
  {
    label: "LineDraw4627",
    equation: "X50389359Y-103714598D01"
  },
  {
    label: "LineDraw4628",
    equation: "X50193789Y-103606638D01"
  },
  {
    label: "LineDraw4629",
    equation: "X50188920Y-103604914D01"
  },
  {
    label: "LineDraw4630",
    equation: "X50188916Y-103604912D01"
  },
  {
    label: "LineDraw4631",
    equation: "X49988087Y-103533795D01"
  },
  {
    label: "LineDraw4632",
    equation: "X49988083Y-103533794D01"
  },
  {
    label: "LineDraw4633",
    equation: "X49983212Y-103532069D01"
  },
  {
    label: "LineDraw4634",
    equation: "X49978119Y-103531162D01"
  },
  {
    label: "LineDraw4635",
    equation: "X49978116Y-103531161D01"
  },
  {
    label: "LineDraw4636",
    equation: "X49768373Y-103493800D01"
  },
  {
    label: "LineDraw4637",
    equation: "X49768367Y-103493799D01"
  },
  {
    label: "LineDraw4638",
    equation: "X49763284Y-103492894D01"
  },
  {
    label: "LineDraw4639",
    equation: "X49689452Y-103491992D01"
  },
  {
    label: "LineDraw4640",
    equation: "X49545081Y-103490228D01"
  },
  {
    label: "LineDraw4641",
    equation: "X49545079Y-103490228D01"
  },
  {
    label: "LineDraw4642",
    equation: "X49539911Y-103490165D01"
  },
  {
    label: "LineDraw4643",
    equation: "X49319091Y-103523955D01"
  },
  {
    label: "LineDraw4644",
    equation: "X49106756Y-103593357D01"
  },
  {
    label: "LineDraw4645",
    equation: "X48908607Y-103696507D01"
  },
  {
    label: "LineDraw4646",
    equation: "X48904474Y-103699610D01"
  },
  {
    label: "LineDraw4647",
    equation: "X48904471Y-103699612D01"
  },
  {
    label: "LineDraw4648",
    equation: "X48734100Y-103827530D01"
  },
  {
    label: "LineDraw4649",
    equation: "X48729965Y-103830635D01"
  },
  {
    label: "LineDraw4650",
    equation: "X48575629Y-103992138D01"
  },
  {
    label: "LineDraw4651",
    equation: "X48572720Y-103996403D01"
  },
  {
    label: "LineDraw4652",
    equation: "X48572714Y-103996411D01"
  },
  {
    label: "LineDraw4653",
    equation: "X48491633Y-104115271D01"
  },
  {
    label: "LineDraw4654",
    equation: "X48449743Y-104176680D01"
  },
  {
    label: "LineDraw4655",
    equation: "X48355688Y-104379305D01"
  },
  {
    label: "LineDraw4656",
    equation: "X48295989Y-104594570D01"
  },
  {
    label: "LineDraw4657",
    equation: "X48272251Y-104816695D01"
  },
  {
    label: "LineDraw4658",
    equation: "X48272548Y-104821848D01"
  },
  {
    label: "LineDraw4659",
    equation: "X48272548Y-104821851D01"
  },
  {
    label: "LineDraw4660",
    equation: "X48278011Y-104916590D01"
  },
  {
    label: "LineDraw4661",
    equation: "X48285110Y-105039715D01"
  },
  {
    label: "LineDraw4662",
    equation: "X48286247Y-105044761D01"
  },
  {
    label: "LineDraw4663",
    equation: "X48286248Y-105044767D01"
  },
  {
    label: "LineDraw4664",
    equation: "X48306119Y-105132939D01"
  },
  {
    label: "LineDraw4665",
    equation: "X48334222Y-105257639D01"
  },
  {
    label: "LineDraw4666",
    equation: "X48418266Y-105464616D01"
  },
  {
    label: "LineDraw4667",
    equation: "X48468287Y-105546243D01"
  },
  {
    label: "LineDraw4668",
    equation: "X48532291Y-105650688D01"
  },
  {
    label: "LineDraw4669",
    equation: "X48534987Y-105655088D01"
  },
  {
    label: "LineDraw4670",
    equation: "X48681250Y-105823938D01"
  },
  {
    label: "LineDraw4671",
    equation: "X48853126Y-105966632D01"
  },
  {
    label: "LineDraw4672",
    equation: "X49046000Y-106079338D01"
  },
  {
    label: "LineDraw4673",
    equation: "X49254692Y-106159030D01"
  },
  {
    label: "LineDraw4674",
    equation: "X49259760Y-106160061D01"
  },
  {
    label: "LineDraw4675",
    equation: "X49259763Y-106160062D01"
  },
  {
    label: "LineDraw4676",
    equation: "X49364466Y-106181364D01"
  },
  {
    label: "LineDraw4677",
    equation: "X49473597Y-106203567D01"
  },
  {
    label: "LineDraw4678",
    equation: "X49478772Y-106203757D01"
  },
  {
    label: "LineDraw4679",
    equation: "X49478774Y-106203757D01"
  },
  {
    label: "LineDraw4680",
    equation: "X49691673Y-106211564D01"
  },
  {
    label: "LineDraw4681",
    equation: "X49691677Y-106211564D01"
  },
  {
    label: "LineDraw4682",
    equation: "X49696837Y-106211753D01"
  },
  {
    label: "LineDraw4683",
    equation: "X49701957Y-106211097D01"
  },
  {
    label: "LineDraw4684",
    equation: "X49701959Y-106211097D01"
  },
  {
    label: "LineDraw4685",
    equation: "X49913288Y-106184025D01"
  },
  {
    label: "LineDraw4686",
    equation: "X49913289Y-106184025D01"
  },
  {
    label: "LineDraw4687",
    equation: "X49918416Y-106183368D01"
  },
  {
    label: "LineDraw4688",
    equation: "X49987159Y-106162744D01"
  },
  {
    label: "LineDraw4689",
    equation: "X50127429Y-106120661D01"
  },
  {
    label: "LineDraw4690",
    equation: "X50127434Y-106120659D01"
  },
  {
    label: "LineDraw4691",
    equation: "X50132384Y-106119174D01"
  },
  {
    label: "LineDraw4692",
    equation: "X50332994Y-106020896D01"
  },
  {
    label: "LineDraw4693",
    equation: "X50514860Y-105891173D01"
  },
  {
    label: "LineDraw4694",
    equation: "X50580636Y-105825627D01"
  },
  {
    label: "LineDraw4695",
    equation: "X50669435Y-105737137D01"
  },
  {
    label: "LineDraw4696",
    equation: "X50673096Y-105733489D01"
  },
  {
    label: "LineDraw4697",
    equation: "X50697308Y-105699795D01"
  },
  {
    label: "LineDraw4698",
    equation: "X50803453Y-105552077D01"
  },
  {
    label: "LineDraw4699",
    equation: "X50804776Y-105553028D01"
  },
  {
    label: "LineDraw4700",
    equation: "X50851645Y-105509857D01"
  },
  {
    label: "LineDraw4701",
    equation: "X50921580Y-105497625D01"
  },
  {
    label: "LineDraw4702",
    equation: "X50987026Y-105525144D01"
  },
  {
    label: "LineDraw4703",
    equation: "X51014875Y-105556994D01"
  },
  {
    label: "LineDraw4704",
    equation: "X51074987Y-105655088D01"
  },
  {
    label: "LineDraw4705",
    equation: "X51221250Y-105823938D01"
  },
  {
    label: "LineDraw4706",
    equation: "X51393126Y-105966632D01"
  },
  {
    label: "LineDraw4707",
    equation: "X51463595Y-106007811D01"
  },
  {
    label: "LineDraw4708",
    equation: "X51466445Y-106009476D01"
  },
  {
    label: "LineDraw4709",
    equation: "X51515169Y-106061114D01"
  },
  {
    label: "LineDraw4710",
    equation: "X51528240Y-106130897D01"
  },
  {
    label: "LineDraw4711",
    equation: "X51501509Y-106196669D01"
  },
  {
    label: "LineDraw4712",
    equation: "X51461055Y-106230027D01"
  },
  {
    label: "LineDraw4713",
    equation: "X51448607Y-106236507D01"
  },
  {
    label: "LineDraw4714",
    equation: "X51444474Y-106239610D01"
  },
  {
    label: "LineDraw4715",
    equation: "X51444471Y-106239612D01"
  },
  {
    label: "LineDraw4716",
    equation: "X51274100Y-106367530D01"
  },
  {
    label: "LineDraw4717",
    equation: "X51269965Y-106370635D01"
  },
  {
    label: "LineDraw4718",
    equation: "X51259460Y-106381628D01"
  },
  {
    label: "LineDraw4719",
    equation: "X51169087Y-106476198D01"
  },
  {
    label: "LineDraw4720",
    equation: "X51115629Y-106532138D01"
  },
  {
    label: "LineDraw4721",
    equation: "X51112715Y-106536410D01"
  },
  {
    label: "LineDraw4722",
    equation: "X51112714Y-106536411D01"
  },
  {
    label: "LineDraw4723",
    equation: "X51058747Y-106615524D01"
  },
  {
    label: "LineDraw4724",
    equation: "X50989743Y-106716680D01"
  },
  {
    label: "LineDraw4725",
    equation: "X50895688Y-106919305D01"
  },
  {
    label: "LineDraw4726",
    equation: "X50835989Y-107134570D01"
  },
  {
    label: "LineDraw4727",
    equation: "X50835440Y-107139707D01"
  },
  {
    label: "LineDraw4728",
    equation: "X50835024Y-107143601D01"
  },
  {
    label: "LineDraw4729",
    equation: "X50812251Y-107356695D01"
  },
  {
    label: "LineDraw4730",
    equation: "X50812548Y-107361848D01"
  },
  {
    label: "LineDraw4731",
    equation: "X50812548Y-107361851D01"
  },
  {
    label: "LineDraw4732",
    equation: "X50824812Y-107574547D01"
  },
  {
    label: "LineDraw4733",
    equation: "X50825110Y-107579715D01"
  },
  {
    label: "LineDraw4734",
    equation: "X50826247Y-107584761D01"
  },
  {
    label: "LineDraw4735",
    equation: "X50826248Y-107584767D01"
  },
  {
    label: "LineDraw4736",
    equation: "X50846119Y-107672939D01"
  },
  {
    label: "LineDraw4737",
    equation: "X50874222Y-107797639D01"
  },
  {
    label: "LineDraw4738",
    equation: "X50958266Y-108004616D01"
  },
  {
    label: "LineDraw4739",
    equation: "X51074987Y-108195088D01"
  },
  {
    label: "LineDraw4740",
    equation: "X51221250Y-108363938D01"
  },
  {
    label: "LineDraw4741",
    equation: "X51393126Y-108506632D01"
  },
  {
    label: "LineDraw4742",
    equation: "X51436506Y-108531981D01"
  },
  {
    label: "LineDraw4743",
    equation: "X51466445Y-108549476D01"
  },
  {
    label: "LineDraw4744",
    equation: "X51515169Y-108601114D01"
  },
  {
    label: "LineDraw4745",
    equation: "X51528240Y-108670897D01"
  },
  {
    label: "LineDraw4746",
    equation: "X51501509Y-108736669D01"
  },
  {
    label: "LineDraw4747",
    equation: "X51461055Y-108770027D01"
  },
  {
    label: "LineDraw4748",
    equation: "X51448607Y-108776507D01"
  },
  {
    label: "LineDraw4749",
    equation: "X51444474Y-108779610D01"
  },
  {
    label: "LineDraw4750",
    equation: "X51444471Y-108779612D01"
  },
  {
    label: "LineDraw4751",
    equation: "X51276873Y-108905448D01"
  },
  {
    label: "LineDraw4752",
    equation: "X51269965Y-108910635D01"
  },
  {
    label: "LineDraw4753",
    equation: "X51266393Y-108914373D01"
  },
  {
    label: "LineDraw4754",
    equation: "X51121796Y-109065685D01"
  },
  {
    label: "LineDraw4755",
    equation: "X51115629Y-109072138D01"
  },
  {
    label: "LineDraw4756",
    equation: "X51008201Y-109229621D01"
  },
  {
    label: "LineDraw4757",
    equation: "X50953293Y-109274621D01"
  },
  {
    label: "LineDraw4758",
    equation: "X50882768Y-109282792D01"
  },
  {
    label: "LineDraw4759",
    equation: "X50819021Y-109251538D01"
  },
  {
    label: "LineDraw4760",
    equation: "X50798324Y-109227054D01"
  },
  {
    label: "LineDraw4761",
    equation: "X50717822Y-109102617D01"
  },
  {
    label: "LineDraw4762",
    equation: "X50717820Y-109102614D01"
  },
  {
    label: "LineDraw4763",
    equation: "X50715014Y-109098277D01"
  },
  {
    label: "LineDraw4764",
    equation: "X50564670Y-108933051D01"
  },
  {
    label: "LineDraw4765",
    equation: "X50560619Y-108929852D01"
  },
  {
    label: "LineDraw4766",
    equation: "X50560615Y-108929848D01"
  },
  {
    label: "LineDraw4767",
    equation: "X50393414Y-108797800D01"
  },
  {
    label: "LineDraw4768",
    equation: "X50393410Y-108797798D01"
  },
  {
    label: "LineDraw4769",
    equation: "X50389359Y-108794598D01"
  },
  {
    label: "LineDraw4770",
    equation: "X50193789Y-108686638D01"
  },
  {
    label: "LineDraw4771",
    equation: "X50188920Y-108684914D01"
  },
  {
    label: "LineDraw4772",
    equation: "X50188916Y-108684912D01"
  },
  {
    label: "LineDraw4773",
    equation: "X49988087Y-108613795D01"
  },
  {
    label: "LineDraw4774",
    equation: "X49988083Y-108613794D01"
  },
  {
    label: "LineDraw4775",
    equation: "X49983212Y-108612069D01"
  },
  {
    label: "LineDraw4776",
    equation: "X49978119Y-108611162D01"
  },
  {
    label: "LineDraw4777",
    equation: "X49978116Y-108611161D01"
  },
  {
    label: "LineDraw4778",
    equation: "X49768373Y-108573800D01"
  },
  {
    label: "LineDraw4779",
    equation: "X49768367Y-108573799D01"
  },
  {
    label: "LineDraw4780",
    equation: "X49763284Y-108572894D01"
  },
  {
    label: "LineDraw4781",
    equation: "X49689452Y-108571992D01"
  },
  {
    label: "LineDraw4782",
    equation: "X49545081Y-108570228D01"
  },
  {
    label: "LineDraw4783",
    equation: "X49545079Y-108570228D01"
  },
  {
    label: "LineDraw4784",
    equation: "X49539911Y-108570165D01"
  },
  {
    label: "LineDraw4785",
    equation: "X49319091Y-108603955D01"
  },
  {
    label: "LineDraw4786",
    equation: "X49106756Y-108673357D01"
  },
  {
    label: "LineDraw4787",
    equation: "X49076443Y-108689137D01"
  },
  {
    label: "LineDraw4788",
    equation: "X48942603Y-108758810D01"
  },
  {
    label: "LineDraw4789",
    equation: "X48908607Y-108776507D01"
  },
  {
    label: "LineDraw4790",
    equation: "X48904474Y-108779610D01"
  },
  {
    label: "LineDraw4791",
    equation: "X48904471Y-108779612D01"
  },
  {
    label: "LineDraw4792",
    equation: "X48736873Y-108905448D01"
  },
  {
    label: "LineDraw4793",
    equation: "X48729965Y-108910635D01"
  },
  {
    label: "LineDraw4794",
    equation: "X48726393Y-108914373D01"
  },
  {
    label: "LineDraw4795",
    equation: "X48581796Y-109065685D01"
  },
  {
    label: "LineDraw4796",
    equation: "X48575629Y-109072138D01"
  },
  {
    label: "LineDraw4797",
    equation: "X48449743Y-109256680D01"
  },
  {
    label: "LineDraw4798",
    equation: "X48434003Y-109290590D01"
  },
  {
    label: "LineDraw4799",
    equation: "X48367971Y-109432844D01"
  },
  {
    label: "LineDraw4800",
    equation: "X48355688Y-109459305D01"
  },
  {
    label: "LineDraw4801",
    equation: "X48295989Y-109674570D01"
  },
  {
    label: "LineDraw4802",
    equation: "X48272251Y-109896695D01"
  },
  {
    label: "LineDraw4803",
    equation: "X48272548Y-109901848D01"
  },
  {
    label: "LineDraw4804",
    equation: "X48272548Y-109901851D01"
  },
  {
    label: "LineDraw4805",
    equation: "X48280965Y-110047827D01"
  },
  {
    label: "LineDraw4806",
    equation: "X48285110Y-110119715D01"
  },
  {
    label: "LineDraw4807",
    equation: "X48286247Y-110124761D01"
  },
  {
    label: "LineDraw4808",
    equation: "X48286248Y-110124767D01"
  },
  {
    label: "LineDraw4809",
    equation: "X48306119Y-110212939D01"
  },
  {
    label: "LineDraw4810",
    equation: "X48334222Y-110337639D01"
  },
  {
    label: "LineDraw4811",
    equation: "X48418266Y-110544616D01"
  },
  {
    label: "LineDraw4812",
    equation: "X48469019Y-110627438D01"
  },
  {
    label: "LineDraw4813",
    equation: "X48532291Y-110730688D01"
  },
  {
    label: "LineDraw4814",
    equation: "X48534987Y-110735088D01"
  },
  {
    label: "LineDraw4815",
    equation: "X48681250Y-110903938D01"
  },
  {
    label: "LineDraw4816",
    equation: "X48853126Y-111046632D01"
  },
  {
    label: "LineDraw4817",
    equation: "X48894637Y-111070889D01"
  },
  {
    label: "LineDraw4818",
    equation: "X48926445Y-111089476D01"
  },
  {
    label: "LineDraw4819",
    equation: "X48975169Y-111141114D01"
  },
  {
    label: "LineDraw4820",
    equation: "X48988240Y-111210897D01"
  },
  {
    label: "LineDraw4821",
    equation: "X48961509Y-111276669D01"
  },
  {
    label: "LineDraw4822",
    equation: "X48921055Y-111310027D01"
  },
  {
    label: "LineDraw4823",
    equation: "X48908607Y-111316507D01"
  },
  {
    label: "LineDraw4824",
    equation: "X48904474Y-111319610D01"
  },
  {
    label: "LineDraw4825",
    equation: "X48904471Y-111319612D01"
  },
  {
    label: "LineDraw4826",
    equation: "X48734100Y-111447530D01"
  },
  {
    label: "LineDraw4827",
    equation: "X48729965Y-111450635D01"
  },
  {
    label: "LineDraw4828",
    equation: "X48575629Y-111612138D01"
  },
  {
    label: "LineDraw4829",
    equation: "X48572715Y-111616410D01"
  },
  {
    label: "LineDraw4830",
    equation: "X48572714Y-111616411D01"
  },
  {
    label: "LineDraw4831",
    equation: "X48487556Y-111741249D01"
  },
  {
    label: "LineDraw4832",
    equation: "X48449743Y-111796680D01"
  },
  {
    label: "LineDraw4833",
    equation: "X48436159Y-111825944D01"
  },
  {
    label: "LineDraw4834",
    equation: "X48377370Y-111952596D01"
  },
  {
    label: "LineDraw4835",
    equation: "X48355688Y-111999305D01"
  },
  {
    label: "LineDraw4836",
    equation: "X48295989Y-112214570D01"
  },
  {
    label: "LineDraw4837",
    equation: "X48272251Y-112436695D01"
  },
  {
    label: "LineDraw4838",
    equation: "X48272548Y-112441848D01"
  },
  {
    label: "LineDraw4839",
    equation: "X48272548Y-112441851D01"
  },
  {
    label: "LineDraw4840",
    equation: "X48278011Y-112536590D01"
  },
  {
    label: "LineDraw4841",
    equation: "X48285110Y-112659715D01"
  },
  {
    label: "LineDraw4842",
    equation: "X48286247Y-112664761D01"
  },
  {
    label: "LineDraw4843",
    equation: "X48286248Y-112664767D01"
  },
  {
    label: "LineDraw4844",
    equation: "X48306119Y-112752939D01"
  },
  {
    label: "LineDraw4845",
    equation: "X48334222Y-112877639D01"
  },
  {
    label: "LineDraw4846",
    equation: "X48418266Y-113084616D01"
  },
  {
    label: "LineDraw4847",
    equation: "X48534987Y-113275088D01"
  },
  {
    label: "LineDraw4848",
    equation: "X48681250Y-113443938D01"
  },
  {
    label: "LineDraw4849",
    equation: "X48853126Y-113586632D01"
  },
  {
    label: "LineDraw4850",
    equation: "X48917930Y-113624500D01"
  },
  {
    label: "LineDraw4851",
    equation: "X48926445Y-113629476D01"
  },
  {
    label: "LineDraw4852",
    equation: "X48975169Y-113681114D01"
  },
  {
    label: "LineDraw4853",
    equation: "X48988240Y-113750897D01"
  },
  {
    label: "LineDraw4854",
    equation: "X48961509Y-113816669D01"
  },
  {
    label: "LineDraw4855",
    equation: "X48921055Y-113850027D01"
  },
  {
    label: "LineDraw4856",
    equation: "X48908607Y-113856507D01"
  },
  {
    label: "LineDraw4857",
    equation: "X48904474Y-113859610D01"
  },
  {
    label: "LineDraw4858",
    equation: "X48904471Y-113859612D01"
  },
  {
    label: "LineDraw4859",
    equation: "X48734100Y-113987530D01"
  },
  {
    label: "LineDraw4860",
    equation: "X48729965Y-113990635D01"
  },
  {
    label: "LineDraw4861",
    equation: "X48726393Y-113994373D01"
  },
  {
    label: "LineDraw4862",
    equation: "X48633911Y-114091150D01"
  },
  {
    label: "LineDraw4863",
    equation: "X48575629Y-114152138D01"
  },
  {
    label: "LineDraw4864",
    equation: "X48572720Y-114156403D01"
  },
  {
    label: "LineDraw4865",
    equation: "X48572714Y-114156411D01"
  },
  {
    label: "LineDraw4866",
    equation: "X48561247Y-114173221D01"
  },
  {
    label: "LineDraw4867",
    equation: "X48449743Y-114336680D01"
  },
  {
    label: "LineDraw4868",
    equation: "X48434003Y-114370590D01"
  },
  {
    label: "LineDraw4869",
    equation: "X48363488Y-114522502D01"
  },
  {
    label: "LineDraw4870",
    equation: "X48355688Y-114539305D01"
  },
  {
    label: "LineDraw4871",
    equation: "X48295989Y-114754570D01"
  },
  {
    label: "LineDraw4872",
    equation: "X48272251Y-114976695D01"
  },
  {
    label: "LineDraw4873",
    equation: "X48272548Y-114981848D01"
  },
  {
    label: "LineDraw4874",
    equation: "X48272548Y-114981851D01"
  },
  {
    label: "LineDraw4875",
    equation: "X48284385Y-115187140D01"
  },
  {
    label: "LineDraw4876",
    equation: "X48285110Y-115199715D01"
  },
  {
    label: "LineDraw4877",
    equation: "X48286247Y-115204761D01"
  },
  {
    label: "LineDraw4878",
    equation: "X48286248Y-115204767D01"
  },
  {
    label: "LineDraw4879",
    equation: "X48299556Y-115263818D01"
  },
  {
    label: "LineDraw4880",
    equation: "X48334222Y-115417639D01"
  },
  {
    label: "LineDraw4881",
    equation: "X48418266Y-115624616D01"
  },
  {
    label: "LineDraw4882",
    equation: "X48534987Y-115815088D01"
  },
  {
    label: "LineDraw4883",
    equation: "X48681250Y-115983938D01"
  },
  {
    label: "LineDraw4884",
    equation: "X48853126Y-116126632D01"
  },
  {
    label: "LineDraw4885",
    equation: "X48878570Y-116141500D01"
  },
  {
    label: "LineDraw4886",
    equation: "X48926445Y-116169476D01"
  },
  {
    label: "LineDraw4887",
    equation: "X48975169Y-116221114D01"
  },
  {
    label: "LineDraw4888",
    equation: "X48988240Y-116290897D01"
  },
  {
    label: "LineDraw4889",
    equation: "X48961509Y-116356669D01"
  },
  {
    label: "LineDraw4890",
    equation: "X48921055Y-116390027D01"
  },
  {
    label: "LineDraw4891",
    equation: "X48908607Y-116396507D01"
  },
  {
    label: "LineDraw4892",
    equation: "X48904474Y-116399610D01"
  },
  {
    label: "LineDraw4893",
    equation: "X48904471Y-116399612D01"
  },
  {
    label: "LineDraw4894",
    equation: "X48825182Y-116459144D01"
  },
  {
    label: "LineDraw4895",
    equation: "X48729965Y-116530635D01"
  },
  {
    label: "LineDraw4896",
    equation: "X48726393Y-116534373D01"
  },
  {
    label: "LineDraw4897",
    equation: "X48606109Y-116660243D01"
  },
  {
    label: "LineDraw4898",
    equation: "X48575629Y-116692138D01"
  },
  {
    label: "LineDraw4899",
    equation: "X48449743Y-116876680D01"
  },
  {
    label: "LineDraw4900",
    equation: "X48355688Y-117079305D01"
  },
  {
    label: "LineDraw4901",
    equation: "X48295989Y-117294570D01"
  },
  {
    label: "LineDraw4902",
    equation: "X48272251Y-117516695D01"
  },
  {
    label: "LineDraw4903",
    equation: "X48272548Y-117521848D01"
  },
  {
    label: "LineDraw4904",
    equation: "X48272548Y-117521851D01"
  },
  {
    label: "LineDraw4905",
    equation: "X48278011Y-117616590D01"
  },
  {
    label: "LineDraw4906",
    equation: "X48285110Y-117739715D01"
  },
  {
    label: "LineDraw4907",
    equation: "X48286247Y-117744761D01"
  },
  {
    label: "LineDraw4908",
    equation: "X48286248Y-117744767D01"
  },
  {
    label: "LineDraw4909",
    equation: "X48306119Y-117832939D01"
  },
  {
    label: "LineDraw4910",
    equation: "X48334222Y-117957639D01"
  },
  {
    label: "LineDraw4911",
    equation: "X48418266Y-118164616D01"
  },
  {
    label: "LineDraw4912",
    equation: "X48469019Y-118247438D01"
  },
  {
    label: "LineDraw4913",
    equation: "X48532291Y-118350688D01"
  },
  {
    label: "LineDraw4914",
    equation: "X48534987Y-118355088D01"
  },
  {
    label: "LineDraw4915",
    equation: "X48681250Y-118523938D01"
  },
  {
    label: "LineDraw4916",
    equation: "X48853126Y-118666632D01"
  },
  {
    label: "LineDraw4917",
    equation: "X49046000Y-118779338D01"
  },
  {
    label: "LineDraw4918",
    equation: "X49254692Y-118859030D01"
  },
  {
    label: "LineDraw4919",
    equation: "X49259760Y-118860061D01"
  },
  {
    label: "LineDraw4920",
    equation: "X49259763Y-118860062D01"
  },
  {
    label: "LineDraw4921",
    equation: "X49346816Y-118877773D01"
  },
  {
    label: "LineDraw4922",
    equation: "X49473597Y-118903567D01"
  },
  {
    label: "LineDraw4923",
    equation: "X49478772Y-118903757D01"
  },
  {
    label: "LineDraw4924",
    equation: "X49478774Y-118903757D01"
  },
  {
    label: "LineDraw4925",
    equation: "X49691673Y-118911564D01"
  },
  {
    label: "LineDraw4926",
    equation: "X49691677Y-118911564D01"
  },
  {
    label: "LineDraw4927",
    equation: "X49696837Y-118911753D01"
  },
  {
    label: "LineDraw4928",
    equation: "X49701957Y-118911097D01"
  },
  {
    label: "LineDraw4929",
    equation: "X49701959Y-118911097D01"
  },
  {
    label: "LineDraw4930",
    equation: "X49913288Y-118884025D01"
  },
  {
    label: "LineDraw4931",
    equation: "X49913289Y-118884025D01"
  },
  {
    label: "LineDraw4932",
    equation: "X49918416Y-118883368D01"
  },
  {
    label: "LineDraw4933",
    equation: "X49978593Y-118865314D01"
  },
  {
    label: "LineDraw4934",
    equation: "X50127429Y-118820661D01"
  },
  {
    label: "LineDraw4935",
    equation: "X50127434Y-118820659D01"
  },
  {
    label: "LineDraw4936",
    equation: "X50132384Y-118819174D01"
  },
  {
    label: "LineDraw4937",
    equation: "X50332994Y-118720896D01"
  },
  {
    label: "LineDraw4938",
    equation: "X50514860Y-118591173D01"
  },
  {
    label: "LineDraw4939",
    equation: "X50673096Y-118433489D01"
  },
  {
    label: "LineDraw4940",
    equation: "X50732594Y-118350689D01"
  },
  {
    label: "LineDraw4941",
    equation: "X50803453Y-118252077D01"
  },
  {
    label: "LineDraw4942",
    equation: "X50804776Y-118253028D01"
  },
  {
    label: "LineDraw4943",
    equation: "X50851645Y-118209857D01"
  },
  {
    label: "LineDraw4944",
    equation: "X50921580Y-118197625D01"
  },
  {
    label: "LineDraw4945",
    equation: "X50987026Y-118225144D01"
  },
  {
    label: "LineDraw4946",
    equation: "X51014875Y-118256994D01"
  },
  {
    label: "LineDraw4947",
    equation: "X51074987Y-118355088D01"
  },
  {
    label: "LineDraw4948",
    equation: "X51221250Y-118523938D01"
  },
  {
    label: "LineDraw4949",
    equation: "X51393126Y-118666632D01"
  },
  {
    label: "LineDraw4950",
    equation: "X51408891Y-118675844D01"
  },
  {
    label: "LineDraw4951",
    equation: "X51466445Y-118709476D01"
  },
  {
    label: "LineDraw4952",
    equation: "X51515169Y-118761114D01"
  },
  {
    label: "LineDraw4953",
    equation: "X51528240Y-118830897D01"
  },
  {
    label: "LineDraw4954",
    equation: "X51501509Y-118896669D01"
  },
  {
    label: "LineDraw4955",
    equation: "X51461055Y-118930027D01"
  },
  {
    label: "LineDraw4956",
    equation: "X51448607Y-118936507D01"
  },
  {
    label: "LineDraw4957",
    equation: "X51444474Y-118939610D01"
  },
  {
    label: "LineDraw4958",
    equation: "X51444471Y-118939612D01"
  },
  {
    label: "LineDraw4959",
    equation: "X51326961Y-119027841D01"
  },
  {
    label: "LineDraw4960",
    equation: "X51269965Y-119070635D01"
  },
  {
    label: "LineDraw4961",
    equation: "X51115629Y-119232138D01"
  },
  {
    label: "LineDraw4962",
    equation: "X51112715Y-119236410D01"
  },
  {
    label: "LineDraw4963",
    equation: "X51112714Y-119236411D01"
  },
  {
    label: "LineDraw4964",
    equation: "X51070949Y-119297637D01"
  },
  {
    label: "LineDraw4965",
    equation: "X50989743Y-119416680D01"
  },
  {
    label: "LineDraw4966",
    equation: "X50895688Y-119619305D01"
  },
  {
    label: "LineDraw4967",
    equation: "X50835989Y-119834570D01"
  },
  {
    label: "LineDraw4968",
    equation: "X50812251Y-120056695D01"
  },
  {
    label: "LineDraw4969",
    equation: "X50812548Y-120061848D01"
  },
  {
    label: "LineDraw4970",
    equation: "X50812548Y-120061851D01"
  },
  {
    label: "LineDraw4971",
    equation: "X50818011Y-120156590D01"
  },
  {
    label: "LineDraw4972",
    equation: "X50825110Y-120279715D01"
  },
  {
    label: "LineDraw4973",
    equation: "X50826247Y-120284761D01"
  },
  {
    label: "LineDraw4974",
    equation: "X50826248Y-120284767D01"
  },
  {
    label: "LineDraw4975",
    equation: "X50846119Y-120372939D01"
  },
  {
    label: "LineDraw4976",
    equation: "X50874222Y-120497639D01"
  },
  {
    label: "LineDraw4977",
    equation: "X50958266Y-120704616D01"
  },
  {
    label: "LineDraw4978",
    equation: "X51074987Y-120895088D01"
  },
  {
    label: "LineDraw4979",
    equation: "X51221250Y-121063938D01"
  },
  {
    label: "LineDraw4980",
    equation: "X51393126Y-121206632D01"
  },
  {
    label: "LineDraw4981",
    equation: "X51463595Y-121247811D01"
  },
  {
    label: "LineDraw4982",
    equation: "X51466445Y-121249476D01"
  },
  {
    label: "LineDraw4983",
    equation: "X51515169Y-121301114D01"
  },
  {
    label: "LineDraw4984",
    equation: "X51528240Y-121370897D01"
  },
  {
    label: "LineDraw4985",
    equation: "X51501509Y-121436669D01"
  },
  {
    label: "LineDraw4986",
    equation: "X51461055Y-121470027D01"
  },
  {
    label: "LineDraw4987",
    equation: "X51448607Y-121476507D01"
  },
  {
    label: "LineDraw4988",
    equation: "X51444474Y-121479610D01"
  },
  {
    label: "LineDraw4989",
    equation: "X51444471Y-121479612D01"
  },
  {
    label: "LineDraw4990",
    equation: "X51420247Y-121497800D01"
  },
  {
    label: "LineDraw4991",
    equation: "X51269965Y-121610635D01"
  },
  {
    label: "LineDraw4992",
    equation: "X51266393Y-121614373D01"
  },
  {
    label: "LineDraw4993",
    equation: "X51136785Y-121750000D01"
  },
  {
    label: "LineDraw4994",
    equation: "X51115629Y-121772138D01"
  },
  {
    label: "LineDraw4995",
    equation: "X51008201Y-121929621D01"
  },
  {
    label: "LineDraw4996",
    equation: "X50953293Y-121974621D01"
  },
  {
    label: "LineDraw4997",
    equation: "X50882768Y-121982792D01"
  },
  {
    label: "LineDraw4998",
    equation: "X50819021Y-121951538D01"
  },
  {
    label: "LineDraw4999",
    equation: "X50798324Y-121927054D01"
  },
  {
    label: "LineDraw5000",
    equation: "X50717822Y-121802617D01"
  },
  {
    label: "LineDraw5001",
    equation: "X50717820Y-121802614D01"
  },
  {
    label: "LineDraw5002",
    equation: "X50715014Y-121798277D01"
  },
  {
    label: "LineDraw5003",
    equation: "X50564670Y-121633051D01"
  },
  {
    label: "LineDraw5004",
    equation: "X50560619Y-121629852D01"
  },
  {
    label: "LineDraw5005",
    equation: "X50560615Y-121629848D01"
  },
  {
    label: "LineDraw5006",
    equation: "X50393414Y-121497800D01"
  },
  {
    label: "LineDraw5007",
    equation: "X50393410Y-121497798D01"
  },
  {
    label: "LineDraw5008",
    equation: "X50389359Y-121494598D01"
  },
  {
    label: "LineDraw5009",
    equation: "X50361283Y-121479099D01"
  },
  {
    label: "LineDraw5010",
    equation: "X50337136Y-121465769D01"
  },
  {
    label: "LineDraw5011",
    equation: "X50193789Y-121386638D01"
  },
  {
    label: "LineDraw5012",
    equation: "X50188920Y-121384914D01"
  },
  {
    label: "LineDraw5013",
    equation: "X50188916Y-121384912D01"
  },
  {
    label: "LineDraw5014",
    equation: "X49988087Y-121313795D01"
  },
  {
    label: "LineDraw5015",
    equation: "X49988083Y-121313794D01"
  },
  {
    label: "LineDraw5016",
    equation: "X49983212Y-121312069D01"
  },
  {
    label: "LineDraw5017",
    equation: "X49978119Y-121311162D01"
  },
  {
    label: "LineDraw5018",
    equation: "X49978116Y-121311161D01"
  },
  {
    label: "LineDraw5019",
    equation: "X49768373Y-121273800D01"
  },
  {
    label: "LineDraw5020",
    equation: "X49768367Y-121273799D01"
  },
  {
    label: "LineDraw5021",
    equation: "X49763284Y-121272894D01"
  },
  {
    label: "LineDraw5022",
    equation: "X49689452Y-121271992D01"
  },
  {
    label: "LineDraw5023",
    equation: "X49545081Y-121270228D01"
  },
  {
    label: "LineDraw5024",
    equation: "X49545079Y-121270228D01"
  },
  {
    label: "LineDraw5025",
    equation: "X49539911Y-121270165D01"
  },
  {
    label: "LineDraw5026",
    equation: "X49319091Y-121303955D01"
  },
  {
    label: "LineDraw5027",
    equation: "X49106756Y-121373357D01"
  },
  {
    label: "LineDraw5028",
    equation: "X48908607Y-121476507D01"
  },
  {
    label: "LineDraw5029",
    equation: "X48904474Y-121479610D01"
  },
  {
    label: "LineDraw5030",
    equation: "X48904471Y-121479612D01"
  },
  {
    label: "LineDraw5031",
    equation: "X48880247Y-121497800D01"
  },
  {
    label: "LineDraw5032",
    equation: "X48729965Y-121610635D01"
  },
  {
    label: "LineDraw5033",
    equation: "X48726393Y-121614373D01"
  },
  {
    label: "LineDraw5034",
    equation: "X48596785Y-121750000D01"
  },
  {
    label: "LineDraw5035",
    equation: "X48575629Y-121772138D01"
  },
  {
    label: "LineDraw5036",
    equation: "X48572720Y-121776403D01"
  },
  {
    label: "LineDraw5037",
    equation: "X48572714Y-121776411D01"
  },
  {
    label: "LineDraw5038",
    equation: "X48563523Y-121789885D01"
  },
  {
    label: "LineDraw5039",
    equation: "X48449743Y-121956680D01"
  },
  {
    label: "LineDraw5040",
    equation: "X48434003Y-121990590D01"
  },
  {
    label: "LineDraw5041",
    equation: "X48359047Y-122152069D01"
  },
  {
    label: "LineDraw5042",
    equation: "X48355688Y-122159305D01"
  },
  {
    label: "LineDraw5043",
    equation: "X48295989Y-122374570D01"
  },
  {
    label: "LineDraw5044",
    equation: "X48272251Y-122596695D01"
  },
  {
    label: "LineDraw5045",
    equation: "X48272548Y-122601848D01"
  },
  {
    label: "LineDraw5046",
    equation: "X48272548Y-122601851D01"
  },
  {
    label: "LineDraw5047",
    equation: "X48278011Y-122696590D01"
  },
  {
    label: "LineDraw5048",
    equation: "X48285110Y-122819715D01"
  },
  {
    label: "LineDraw5049",
    equation: "X48286247Y-122824761D01"
  },
  {
    label: "LineDraw5050",
    equation: "X48286248Y-122824767D01"
  },
  {
    label: "LineDraw5051",
    equation: "X48306119Y-122912939D01"
  },
  {
    label: "LineDraw5052",
    equation: "X48334222Y-123037639D01"
  },
  {
    label: "LineDraw5053",
    equation: "X48418266Y-123244616D01"
  },
  {
    label: "LineDraw5054",
    equation: "X48469019Y-123327438D01"
  },
  {
    label: "LineDraw5055",
    equation: "X48532291Y-123430688D01"
  },
  {
    label: "LineDraw5056",
    equation: "X48534987Y-123435088D01"
  },
  {
    label: "LineDraw5057",
    equation: "X48681250Y-123603938D01"
  },
  {
    label: "LineDraw5058",
    equation: "X48853126Y-123746632D01"
  },
  {
    label: "LineDraw5059",
    equation: "X48910023Y-123779880D01"
  },
  {
    label: "LineDraw5060",
    equation: "X48926445Y-123789476D01"
  },
  {
    label: "LineDraw5061",
    equation: "X48975169Y-123841114D01"
  },
  {
    label: "LineDraw5062",
    equation: "X48988240Y-123910897D01"
  },
  {
    label: "LineDraw5063",
    equation: "X48961509Y-123976669D01"
  },
  {
    label: "LineDraw5064",
    equation: "X48921055Y-124010027D01"
  },
  {
    label: "LineDraw5065",
    equation: "X48908607Y-124016507D01"
  },
  {
    label: "LineDraw5066",
    equation: "X48904474Y-124019610D01"
  },
  {
    label: "LineDraw5067",
    equation: "X48904471Y-124019612D01"
  },
  {
    label: "LineDraw5068",
    equation: "X48734100Y-124147530D01"
  },
  {
    label: "LineDraw5069",
    equation: "X48729965Y-124150635D01"
  },
  {
    label: "LineDraw5070",
    equation: "X48575629Y-124312138D01"
  },
  {
    label: "LineDraw5071",
    equation: "X48449743Y-124496680D01"
  },
  {
    label: "LineDraw5072",
    equation: "X48355688Y-124699305D01"
  },
  {
    label: "LineDraw5073",
    equation: "X48295989Y-124914570D01"
  },
  {
    label: "LineDraw5074",
    equation: "X48272251Y-125136695D01"
  },
  {
    label: "LineDraw5075",
    equation: "X48272548Y-125141848D01"
  },
  {
    label: "LineDraw5076",
    equation: "X48272548Y-125141851D01"
  },
  {
    label: "LineDraw5077",
    equation: "X48278011Y-125236590D01"
  },
  {
    label: "LineDraw5078",
    equation: "X48285110Y-125359715D01"
  },
  {
    label: "LineDraw5079",
    equation: "X48286247Y-125364761D01"
  },
  {
    label: "LineDraw5080",
    equation: "X48286248Y-125364767D01"
  },
  {
    label: "LineDraw5081",
    equation: "X48306119Y-125452939D01"
  },
  {
    label: "LineDraw5082",
    equation: "X48334222Y-125577639D01"
  },
  {
    label: "LineDraw5083",
    equation: "X48418266Y-125784616D01"
  },
  {
    label: "LineDraw5084",
    equation: "X48469019Y-125867438D01"
  },
  {
    label: "LineDraw5085",
    equation: "X48532291Y-125970688D01"
  },
  {
    label: "LineDraw5086",
    equation: "X48534987Y-125975088D01"
  },
  {
    label: "LineDraw5087",
    equation: "X48681250Y-126143938D01"
  },
  {
    label: "LineDraw5088",
    equation: "X48853126Y-126286632D01"
  },
  {
    label: "LineDraw5089",
    equation: "X49046000Y-126399338D01"
  },
  {
    label: "LineDraw5090",
    equation: "X49050825Y-126401180D01"
  },
  {
    label: "LineDraw5091",
    equation: "X49050826Y-126401181D01"
  },
  {
    label: "LineDraw5092",
    equation: "X49122640Y-126428604D01"
  },
  {
    label: "LineDraw5093",
    equation: "X49254692Y-126479030D01"
  },
  {
    label: "LineDraw5094",
    equation: "X49259760Y-126480061D01"
  },
  {
    label: "LineDraw5095",
    equation: "X49259763Y-126480062D01"
  },
  {
    label: "LineDraw5096",
    equation: "X49357762Y-126500000D01"
  },
  {
    label: "LineDraw5097",
    equation: "X49473597Y-126523567D01"
  },
  {
    label: "LineDraw5098",
    equation: "X49478772Y-126523757D01"
  },
  {
    label: "LineDraw5099",
    equation: "X49478774Y-126523757D01"
  },
  {
    label: "LineDraw5100",
    equation: "X49691673Y-126531564D01"
  },
  {
    label: "LineDraw5101",
    equation: "X49691677Y-126531564D01"
  },
  {
    label: "LineDraw5102",
    equation: "X49696837Y-126531753D01"
  },
  {
    label: "LineDraw5103",
    equation: "X49701957Y-126531097D01"
  },
  {
    label: "LineDraw5104",
    equation: "X49701959Y-126531097D01"
  },
  {
    label: "LineDraw5105",
    equation: "X49913288Y-126504025D01"
  },
  {
    label: "LineDraw5106",
    equation: "X49913289Y-126504025D01"
  },
  {
    label: "LineDraw5107",
    equation: "X49918416Y-126503368D01"
  },
  {
    label: "LineDraw5108",
    equation: "X49952561Y-126493124D01"
  },
  {
    label: "LineDraw5109",
    equation: "X50127429Y-126440661D01"
  },
  {
    label: "LineDraw5110",
    equation: "X50127434Y-126440659D01"
  },
  {
    label: "LineDraw5111",
    equation: "X50132384Y-126439174D01"
  },
  {
    label: "LineDraw5112",
    equation: "X50332994Y-126340896D01"
  },
  {
    label: "LineDraw5113",
    equation: "X50514860Y-126211173D01"
  },
  {
    label: "LineDraw5114",
    equation: "X50673096Y-126053489D01"
  },
  {
    label: "LineDraw5115",
    equation: "X50732594Y-125970689D01"
  },
  {
    label: "LineDraw5116",
    equation: "X50803453Y-125872077D01"
  },
  {
    label: "LineDraw5117",
    equation: "X50804776Y-125873028D01"
  },
  {
    label: "LineDraw5118",
    equation: "X50851645Y-125829857D01"
  },
  {
    label: "LineDraw5119",
    equation: "X50921580Y-125817625D01"
  },
  {
    label: "LineDraw5120",
    equation: "X50987026Y-125845144D01"
  },
  {
    label: "LineDraw5121",
    equation: "X51014875Y-125876994D01"
  },
  {
    label: "LineDraw5122",
    equation: "X51074987Y-125975088D01"
  },
  {
    label: "LineDraw5123",
    equation: "X51221250Y-126143938D01"
  },
  {
    label: "LineDraw5124",
    equation: "X51393126Y-126286632D01"
  },
  {
    label: "LineDraw5125",
    equation: "X51463595Y-126327811D01"
  },
  {
    label: "LineDraw5126",
    equation: "X51466445Y-126329476D01"
  },
  {
    label: "LineDraw5127",
    equation: "X51515169Y-126381114D01"
  },
  {
    label: "LineDraw5128",
    equation: "X51528240Y-126450897D01"
  },
  {
    label: "LineDraw5129",
    equation: "X51501509Y-126516669D01"
  },
  {
    label: "LineDraw5130",
    equation: "X51461055Y-126550027D01"
  },
  {
    label: "LineDraw5131",
    equation: "X51448607Y-126556507D01"
  },
  {
    label: "LineDraw5132",
    equation: "X51444474Y-126559610D01"
  },
  {
    label: "LineDraw5133",
    equation: "X51444471Y-126559612D01"
  },
  {
    label: "LineDraw5134",
    equation: "X51274100Y-126687530D01"
  },
  {
    label: "LineDraw5135",
    equation: "X51269965Y-126690635D01"
  },
  {
    label: "LineDraw5136",
    equation: "X51244894Y-126716870D01"
  },
  {
    label: "LineDraw5137",
    equation: "X51123864Y-126843521D01"
  },
  {
    label: "LineDraw5138",
    equation: "X51115629Y-126852138D01"
  },
  {
    label: "LineDraw5139",
    equation: "X51112715Y-126856410D01"
  },
  {
    label: "LineDraw5140",
    equation: "X51112714Y-126856411D01"
  },
  {
    label: "LineDraw5141",
    equation: "X51110717Y-126859338D01"
  },
  {
    label: "LineDraw5142",
    equation: "X50989743Y-127036680D01"
  },
  {
    label: "LineDraw5143",
    equation: "X50895688Y-127239305D01"
  },
  {
    label: "LineDraw5144",
    equation: "X50835989Y-127454570D01"
  },
  {
    label: "LineDraw5145",
    equation: "X50812251Y-127676695D01"
  },
  {
    label: "LineDraw5146",
    equation: "X50812548Y-127681848D01"
  },
  {
    label: "LineDraw5147",
    equation: "X50812548Y-127681851D01"
  },
  {
    label: "LineDraw5148",
    equation: "X50818011Y-127776590D01"
  },
  {
    label: "LineDraw5149",
    equation: "X50825110Y-127899715D01"
  },
  {
    label: "LineDraw5150",
    equation: "X50826247Y-127904761D01"
  },
  {
    label: "LineDraw5151",
    equation: "X50826248Y-127904767D01"
  },
  {
    label: "LineDraw5152",
    equation: "X50837958Y-127956727D01"
  },
  {
    label: "LineDraw5153",
    equation: "X50874222Y-128117639D01"
  },
  {
    label: "LineDraw5154",
    equation: "X50958266Y-128324616D01"
  },
  {
    label: "LineDraw5155",
    equation: "X50960965Y-128329020D01"
  },
  {
    label: "LineDraw5156",
    equation: "X51066410Y-128501091D01"
  },
  {
    label: "LineDraw5157",
    equation: "X51074987Y-128515088D01"
  },
  {
    label: "LineDraw5158",
    equation: "X51221250Y-128683938D01"
  },
  {
    label: "LineDraw5159",
    equation: "X51367912Y-128805699D01"
  },
  {
    label: "LineDraw5160",
    equation: "X51370654Y-128807975D01"
  },
  {
    label: "LineDraw5161",
    equation: "X51393126Y-128826632D01"
  },
  {
    label: "LineDraw5162",
    equation: "X51419374Y-128841970D01"
  },
  {
    label: "LineDraw5163",
    equation: "X51466445Y-128869476D01"
  },
  {
    label: "LineDraw5164",
    equation: "X51515169Y-128921114D01"
  },
  {
    label: "LineDraw5165",
    equation: "X51528240Y-128990897D01"
  },
  {
    label: "LineDraw5166",
    equation: "X51501509Y-129056669D01"
  },
  {
    label: "LineDraw5167",
    equation: "X51461055Y-129090027D01"
  },
  {
    label: "LineDraw5168",
    equation: "X51448607Y-129096507D01"
  },
  {
    label: "LineDraw5169",
    equation: "X51444474Y-129099610D01"
  },
  {
    label: "LineDraw5170",
    equation: "X51444471Y-129099612D01"
  },
  {
    label: "LineDraw5171",
    equation: "X51279750Y-129223288D01"
  },
  {
    label: "LineDraw5172",
    equation: "X51269965Y-129230635D01"
  },
  {
    label: "LineDraw5173",
    equation: "X51115629Y-129392138D01"
  },
  {
    label: "LineDraw5174",
    equation: "X51008201Y-129549621D01"
  },
  {
    label: "LineDraw5175",
    equation: "X50953293Y-129594621D01"
  },
  {
    label: "LineDraw5176",
    equation: "X50882768Y-129602792D01"
  },
  {
    label: "LineDraw5177",
    equation: "X50819021Y-129571538D01"
  },
  {
    label: "LineDraw5178",
    equation: "X50798324Y-129547054D01"
  },
  {
    label: "LineDraw5179",
    equation: "X50717822Y-129422617D01"
  },
  {
    label: "LineDraw5180",
    equation: "X50717820Y-129422614D01"
  },
  {
    label: "LineDraw5181",
    equation: "X50715014Y-129418277D01"
  },
  {
    label: "LineDraw5182",
    equation: "X50564670Y-129253051D01"
  },
  {
    label: "LineDraw5183",
    equation: "X50560619Y-129249852D01"
  },
  {
    label: "LineDraw5184",
    equation: "X50560615Y-129249848D01"
  },
  {
    label: "LineDraw5185",
    equation: "X50393414Y-129117800D01"
  },
  {
    label: "LineDraw5186",
    equation: "X50393410Y-129117798D01"
  },
  {
    label: "LineDraw5187",
    equation: "X50389359Y-129114598D01"
  },
  {
    label: "LineDraw5188",
    equation: "X50368906Y-129103307D01"
  },
  {
    label: "LineDraw5189",
    equation: "X50289346Y-129059388D01"
  },
  {
    label: "LineDraw5190",
    equation: "X50193789Y-129006638D01"
  },
  {
    label: "LineDraw5191",
    equation: "X50188920Y-129004914D01"
  },
  {
    label: "LineDraw5192",
    equation: "X50188916Y-129004912D01"
  },
  {
    label: "LineDraw5193",
    equation: "X49988087Y-128933795D01"
  },
  {
    label: "LineDraw5194",
    equation: "X49988083Y-128933794D01"
  },
  {
    label: "LineDraw5195",
    equation: "X49983212Y-128932069D01"
  },
  {
    label: "LineDraw5196",
    equation: "X49978119Y-128931162D01"
  },
  {
    label: "LineDraw5197",
    equation: "X49978116Y-128931161D01"
  },
  {
    label: "LineDraw5198",
    equation: "X49768373Y-128893800D01"
  },
  {
    label: "LineDraw5199",
    equation: "X49768367Y-128893799D01"
  },
  {
    label: "LineDraw5200",
    equation: "X49763284Y-128892894D01"
  },
  {
    label: "LineDraw5201",
    equation: "X49689452Y-128891992D01"
  },
  {
    label: "LineDraw5202",
    equation: "X49545081Y-128890228D01"
  },
  {
    label: "LineDraw5203",
    equation: "X49545079Y-128890228D01"
  },
  {
    label: "LineDraw5204",
    equation: "X49539911Y-128890165D01"
  },
  {
    label: "LineDraw5205",
    equation: "X49319091Y-128923955D01"
  },
  {
    label: "LineDraw5206",
    equation: "X49106756Y-128993357D01"
  },
  {
    label: "LineDraw5207",
    equation: "X48908607Y-129096507D01"
  },
  {
    label: "LineDraw5208",
    equation: "X48904474Y-129099610D01"
  },
  {
    label: "LineDraw5209",
    equation: "X48904471Y-129099612D01"
  },
  {
    label: "LineDraw5210",
    equation: "X48739750Y-129223288D01"
  },
  {
    label: "LineDraw5211",
    equation: "X48729965Y-129230635D01"
  },
  {
    label: "LineDraw5212",
    equation: "X48575629Y-129392138D01"
  },
  {
    label: "LineDraw5213",
    equation: "X48449743Y-129576680D01"
  },
  {
    label: "LineDraw5214",
    equation: "X48355688Y-129779305D01"
  },
  {
    label: "LineDraw5215",
    equation: "X48295989Y-129994570D01"
  },
  {
    label: "LineDraw5216",
    equation: "X48272251Y-130216695D01"
  },
  {
    label: "LineDraw5217",
    equation: "X48272548Y-130221848D01"
  },
  {
    label: "LineDraw5218",
    equation: "X48272548Y-130221851D01"
  },
  {
    label: "LineDraw5219",
    equation: "X48282716Y-130398188D01"
  },
  {
    label: "LineDraw5220",
    equation: "X48285110Y-130439715D01"
  },
  {
    label: "LineDraw5221",
    equation: "X48286247Y-130444761D01"
  },
  {
    label: "LineDraw5222",
    equation: "X48286248Y-130444767D01"
  },
  {
    label: "LineDraw5223",
    equation: "X48300780Y-130509246D01"
  },
  {
    label: "LineDraw5224",
    equation: "X48334222Y-130657639D01"
  },
  {
    label: "LineDraw5225",
    equation: "X48372461Y-130751811D01"
  },
  {
    label: "LineDraw5226",
    equation: "X48409671Y-130843448D01"
  },
  {
    label: "LineDraw5227",
    equation: "X48418266Y-130864616D01"
  },
  {
    label: "LineDraw5228",
    equation: "X48469019Y-130947438D01"
  },
  {
    label: "LineDraw5229",
    equation: "X48532291Y-131050688D01"
  },
  {
    label: "LineDraw5230",
    equation: "X48534987Y-131055088D01"
  },
  {
    label: "LineDraw5231",
    equation: "X48681250Y-131223938D01"
  },
  {
    label: "LineDraw5232",
    equation: "X48853126Y-131366632D01"
  },
  {
    label: "LineDraw5233",
    equation: "X48923595Y-131407811D01"
  },
  {
    label: "LineDraw5234",
    equation: "X48926445Y-131409476D01"
  },
  {
    label: "LineDraw5235",
    equation: "X48975169Y-131461114D01"
  },
  {
    label: "LineDraw5236",
    equation: "X48988240Y-131530897D01"
  },
  {
    label: "LineDraw5237",
    equation: "X48961509Y-131596669D01"
  },
  {
    label: "LineDraw5238",
    equation: "X48921055Y-131630027D01"
  },
  {
    label: "LineDraw5239",
    equation: "X48908607Y-131636507D01"
  },
  {
    label: "LineDraw5240",
    equation: "X48904474Y-131639610D01"
  },
  {
    label: "LineDraw5241",
    equation: "X48904471Y-131639612D01"
  },
  {
    label: "LineDraw5242",
    equation: "X48734100Y-131767530D01"
  },
  {
    label: "LineDraw5243",
    equation: "X48729965Y-131770635D01"
  },
  {
    label: "LineDraw5244",
    equation: "X48726393Y-131774373D01"
  },
  {
    label: "LineDraw5245",
    equation: "X48587095Y-131920140D01"
  },
  {
    label: "LineDraw5246",
    equation: "X48575629Y-131932138D01"
  },
  {
    label: "LineDraw5247",
    equation: "X48449743Y-132116680D01"
  },
  {
    label: "LineDraw5248",
    equation: "X48355688Y-132319305D01"
  },
  {
    label: "LineDraw5249",
    equation: "X48295989Y-132534570D01"
  },
  {
    label: "LineDraw5250",
    equation: "X48272251Y-132756695D01"
  },
  {
    label: "LineDraw5251",
    equation: "X48272548Y-132761848D01"
  },
  {
    label: "LineDraw5252",
    equation: "X48272548Y-132761851D01"
  },
  {
    label: "LineDraw5253",
    equation: "X48278088Y-132857925D01"
  },
  {
    label: "LineDraw5254",
    equation: "X48285110Y-132979715D01"
  },
  {
    label: "LineDraw5255",
    equation: "X48286247Y-132984761D01"
  },
  {
    label: "LineDraw5256",
    equation: "X48286248Y-132984767D01"
  },
  {
    label: "LineDraw5257",
    equation: "X48306119Y-133072939D01"
  },
  {
    label: "LineDraw5258",
    equation: "X48334222Y-133197639D01"
  },
  {
    label: "LineDraw5259",
    equation: "X48418266Y-133404616D01"
  },
  {
    label: "LineDraw5260",
    equation: "X48469019Y-133487438D01"
  },
  {
    label: "LineDraw5261",
    equation: "X48531392Y-133589221D01"
  },
  {
    label: "LineDraw5262",
    equation: "X48534987Y-133595088D01"
  },
  {
    label: "LineDraw5263",
    equation: "X48681250Y-133763938D01"
  },
  {
    label: "LineDraw5264",
    equation: "X48853126Y-133906632D01"
  },
  {
    label: "LineDraw5265",
    equation: "X48923595Y-133947811D01"
  },
  {
    label: "LineDraw5266",
    equation: "X48926445Y-133949476D01"
  },
  {
    label: "LineDraw5267",
    equation: "X48975169Y-134001114D01"
  },
  {
    label: "LineDraw5268",
    equation: "X48988240Y-134070897D01"
  },
  {
    label: "LineDraw5269",
    equation: "X48961509Y-134136669D01"
  },
  {
    label: "LineDraw5270",
    equation: "X48921055Y-134170027D01"
  },
  {
    label: "LineDraw5271",
    equation: "X48908607Y-134176507D01"
  },
  {
    label: "LineDraw5272",
    equation: "X48904474Y-134179610D01"
  },
  {
    label: "LineDraw5273",
    equation: "X48904471Y-134179612D01"
  },
  {
    label: "LineDraw5274",
    equation: "X48809213Y-134251134D01"
  },
  {
    label: "LineDraw5275",
    equation: "X48729965Y-134310635D01"
  },
  {
    label: "LineDraw5276",
    equation: "X48726393Y-134314373D01"
  },
  {
    label: "LineDraw5277",
    equation: "X48594803Y-134452074D01"
  },
  {
    label: "LineDraw5278",
    equation: "X48575629Y-134472138D01"
  },
  {
    label: "LineDraw5279",
    equation: "X48572720Y-134476403D01"
  },
  {
    label: "LineDraw5280",
    equation: "X48572714Y-134476411D01"
  },
  {
    label: "LineDraw5281",
    equation: "X48522886Y-134549456D01"
  },
  {
    label: "LineDraw5282",
    equation: "X48449743Y-134656680D01"
  },
  {
    label: "LineDraw5283",
    equation: "X48355688Y-134859305D01"
  },
  {
    label: "LineDraw5284",
    equation: "X48295989Y-135074570D01"
  },
  {
    label: "LineDraw5285",
    equation: "X48272251Y-135296695D01"
  },
  {
    label: "LineDraw5286",
    equation: "X48272548Y-135301848D01"
  },
  {
    label: "LineDraw5287",
    equation: "X48272548Y-135301851D01"
  },
  {
    label: "LineDraw5288",
    equation: "X48278011Y-135396590D01"
  },
  {
    label: "LineDraw5289",
    equation: "X48285110Y-135519715D01"
  },
  {
    label: "LineDraw5290",
    equation: "X48286247Y-135524761D01"
  },
  {
    label: "LineDraw5291",
    equation: "X48286248Y-135524767D01"
  },
  {
    label: "LineDraw5292",
    equation: "X48305201Y-135608866D01"
  },
  {
    label: "LineDraw5293",
    equation: "X48334222Y-135737639D01"
  },
  {
    label: "LineDraw5294",
    equation: "X48418266Y-135944616D01"
  },
  {
    label: "LineDraw5295",
    equation: "X48469019Y-136027438D01"
  },
  {
    label: "LineDraw5296",
    equation: "X48532291Y-136130688D01"
  },
  {
    label: "LineDraw5297",
    equation: "X48534987Y-136135088D01"
  },
  {
    label: "LineDraw5298",
    equation: "X48681250Y-136303938D01"
  },
  {
    label: "LineDraw5299",
    equation: "X48853126Y-136446632D01"
  },
  {
    label: "LineDraw5300",
    equation: "X49046000Y-136559338D01"
  },
  {
    label: "LineDraw5301",
    equation: "X49254692Y-136639030D01"
  },
  {
    label: "LineDraw5302",
    equation: "X49259760Y-136640061D01"
  },
  {
    label: "LineDraw5303",
    equation: "X49259763Y-136640062D01"
  },
  {
    label: "LineDraw5304",
    equation: "X49364466Y-136661364D01"
  },
  {
    label: "LineDraw5305",
    equation: "X49473597Y-136683567D01"
  },
  {
    label: "LineDraw5306",
    equation: "X49478772Y-136683757D01"
  },
  {
    label: "LineDraw5307",
    equation: "X49478774Y-136683757D01"
  },
  {
    label: "LineDraw5308",
    equation: "X49691673Y-136691564D01"
  },
  {
    label: "LineDraw5309",
    equation: "X49691677Y-136691564D01"
  },
  {
    label: "LineDraw5310",
    equation: "X49696837Y-136691753D01"
  },
  {
    label: "LineDraw5311",
    equation: "X49701957Y-136691097D01"
  },
  {
    label: "LineDraw5312",
    equation: "X49701959Y-136691097D01"
  },
  {
    label: "LineDraw5313",
    equation: "X49913288Y-136664025D01"
  },
  {
    label: "LineDraw5314",
    equation: "X49913289Y-136664025D01"
  },
  {
    label: "LineDraw5315",
    equation: "X49918416Y-136663368D01"
  },
  {
    label: "LineDraw5316",
    equation: "X49925096Y-136661364D01"
  },
  {
    label: "LineDraw5317",
    equation: "X50127429Y-136600661D01"
  },
  {
    label: "LineDraw5318",
    equation: "X50127434Y-136600659D01"
  },
  {
    label: "LineDraw5319",
    equation: "X50132384Y-136599174D01"
  },
  {
    label: "LineDraw5320",
    equation: "X50332994Y-136500896D01"
  },
  {
    label: "LineDraw5321",
    equation: "X50514860Y-136371173D01"
  },
  {
    label: "LineDraw5322",
    equation: "X50673096Y-136213489D01"
  },
  {
    label: "LineDraw5323",
    equation: "X50732594Y-136130689D01"
  },
  {
    label: "LineDraw5324",
    equation: "X50803453Y-136032077D01"
  },
  {
    label: "LineDraw5325",
    equation: "X50804776Y-136033028D01"
  },
  {
    label: "LineDraw5326",
    equation: "X50851645Y-135989857D01"
  },
  {
    label: "LineDraw5327",
    equation: "X50921580Y-135977625D01"
  },
  {
    label: "LineDraw5328",
    equation: "X50987026Y-136005144D01"
  },
  {
    label: "LineDraw5329",
    equation: "X51014875Y-136036994D01"
  },
  {
    label: "LineDraw5330",
    equation: "X51074987Y-136135088D01"
  },
  {
    label: "LineDraw5331",
    equation: "X51221250Y-136303938D01"
  },
  {
    label: "LineDraw5332",
    equation: "X51393126Y-136446632D01"
  },
  {
    label: "LineDraw5333",
    equation: "X51463595Y-136487811D01"
  },
  {
    label: "LineDraw5334",
    equation: "X51466445Y-136489476D01"
  },
  {
    label: "LineDraw5335",
    equation: "X51515169Y-136541114D01"
  },
  {
    label: "LineDraw5336",
    equation: "X51528240Y-136610897D01"
  },
  {
    label: "LineDraw5337",
    equation: "X51501509Y-136676669D01"
  },
  {
    label: "LineDraw5338",
    equation: "X51461055Y-136710027D01"
  },
  {
    label: "LineDraw5339",
    equation: "X51448607Y-136716507D01"
  },
  {
    label: "LineDraw5340",
    equation: "X51444474Y-136719610D01"
  },
  {
    label: "LineDraw5341",
    equation: "X51444471Y-136719612D01"
  },
  {
    label: "LineDraw5342",
    equation: "X51420247Y-136737800D01"
  },
  {
    label: "LineDraw5343",
    equation: "X51269965Y-136850635D01"
  },
  {
    label: "LineDraw5344",
    equation: "X51115629Y-137012138D01"
  },
  {
    label: "LineDraw5345",
    equation: "X50989743Y-137196680D01"
  },
  {
    label: "LineDraw5346",
    equation: "X50975903Y-137226496D01"
  },
  {
    label: "LineDraw5347",
    equation: "X50935902Y-137312672D01"
  },
  {
    label: "LineDraw5348",
    equation: "X50895688Y-137399305D01"
  },
  {
    label: "LineDraw5349",
    equation: "X50835989Y-137614570D01"
  },
  {
    label: "LineDraw5350",
    equation: "X50812251Y-137836695D01"
  },
  {
    label: "LineDraw5351",
    equation: "X50812548Y-137841848D01"
  },
  {
    label: "LineDraw5352",
    equation: "X50812548Y-137841851D01"
  },
  {
    label: "LineDraw5353",
    equation: "X50822610Y-138016362D01"
  },
  {
    label: "LineDraw5354",
    equation: "X50825110Y-138059715D01"
  },
  {
    label: "LineDraw5355",
    equation: "X50826247Y-138064761D01"
  },
  {
    label: "LineDraw5356",
    equation: "X50826248Y-138064767D01"
  },
  {
    label: "LineDraw5357",
    equation: "X50836925Y-138112143D01"
  },
  {
    label: "LineDraw5358",
    equation: "X50874222Y-138277639D01"
  },
  {
    label: "LineDraw5359",
    equation: "X50958266Y-138484616D01"
  },
  {
    label: "LineDraw5360",
    equation: "X51074987Y-138675088D01"
  },
  {
    label: "LineDraw5361",
    equation: "X51221250Y-138843938D01"
  },
  {
    label: "LineDraw5362",
    equation: "X51393126Y-138986632D01"
  },
  {
    label: "LineDraw5363",
    equation: "X51463595Y-139027811D01"
  },
  {
    label: "LineDraw5364",
    equation: "X51466445Y-139029476D01"
  },
  {
    label: "LineDraw5365",
    equation: "X51515169Y-139081114D01"
  },
  {
    label: "LineDraw5366",
    equation: "X51528240Y-139150897D01"
  },
  {
    label: "LineDraw5367",
    equation: "X51501509Y-139216669D01"
  },
  {
    label: "LineDraw5368",
    equation: "X51461055Y-139250027D01"
  },
  {
    label: "LineDraw5369",
    equation: "X51448607Y-139256507D01"
  },
  {
    label: "LineDraw5370",
    equation: "X51444474Y-139259610D01"
  },
  {
    label: "LineDraw5371",
    equation: "X51444471Y-139259612D01"
  },
  {
    label: "LineDraw5372",
    equation: "X51283117Y-139380760D01"
  },
  {
    label: "LineDraw5373",
    equation: "X51269965Y-139390635D01"
  },
  {
    label: "LineDraw5374",
    equation: "X51266393Y-139394373D01"
  },
  {
    label: "LineDraw5375",
    equation: "X51174105Y-139490947D01"
  },
  {
    label: "LineDraw5376",
    equation: "X51115629Y-139552138D01"
  },
  {
    label: "LineDraw5377",
    equation: "X51008201Y-139709621D01"
  },
  {
    label: "LineDraw5378",
    equation: "X50953293Y-139754621D01"
  },
  {
    label: "LineDraw5379",
    equation: "X50882768Y-139762792D01"
  },
  {
    label: "LineDraw5380",
    equation: "X50819021Y-139731538D01"
  },
  {
    label: "LineDraw5381",
    equation: "X50798324Y-139707054D01"
  },
  {
    label: "LineDraw5382",
    equation: "X50717822Y-139582617D01"
  },
  {
    label: "LineDraw5383",
    equation: "X50717820Y-139582614D01"
  },
  {
    label: "LineDraw5384",
    equation: "X50715014Y-139578277D01"
  },
  {
    label: "LineDraw5385",
    equation: "X50564670Y-139413051D01"
  },
  {
    label: "LineDraw5386",
    equation: "X50560619Y-139409852D01"
  },
  {
    label: "LineDraw5387",
    equation: "X50560615Y-139409848D01"
  },
  {
    label: "LineDraw5388",
    equation: "X50393414Y-139277800D01"
  },
  {
    label: "LineDraw5389",
    equation: "X50393410Y-139277798D01"
  },
  {
    label: "LineDraw5390",
    equation: "X50389359Y-139274598D01"
  },
  {
    label: "LineDraw5391",
    equation: "X50375797Y-139267111D01"
  },
  {
    label: "LineDraw5392",
    equation: "X50256695Y-139201364D01"
  },
  {
    label: "LineDraw5393",
    equation: "X50193789Y-139166638D01"
  },
  {
    label: "LineDraw5394",
    equation: "X50188920Y-139164914D01"
  },
  {
    label: "LineDraw5395",
    equation: "X50188916Y-139164912D01"
  },
  {
    label: "LineDraw5396",
    equation: "X49988087Y-139093795D01"
  },
  {
    label: "LineDraw5397",
    equation: "X49988083Y-139093794D01"
  },
  {
    label: "LineDraw5398",
    equation: "X49983212Y-139092069D01"
  },
  {
    label: "LineDraw5399",
    equation: "X49978119Y-139091162D01"
  },
  {
    label: "LineDraw5400",
    equation: "X49978116Y-139091161D01"
  },
  {
    label: "LineDraw5401",
    equation: "X49768373Y-139053800D01"
  },
  {
    label: "LineDraw5402",
    equation: "X49768367Y-139053799D01"
  },
  {
    label: "LineDraw5403",
    equation: "X49763284Y-139052894D01"
  },
  {
    label: "LineDraw5404",
    equation: "X49689452Y-139051992D01"
  },
  {
    label: "LineDraw5405",
    equation: "X49545081Y-139050228D01"
  },
  {
    label: "LineDraw5406",
    equation: "X49545079Y-139050228D01"
  },
  {
    label: "LineDraw5407",
    equation: "X49539911Y-139050165D01"
  },
  {
    label: "LineDraw5408",
    equation: "X49319091Y-139083955D01"
  },
  {
    label: "LineDraw5409",
    equation: "X49106756Y-139153357D01"
  },
  {
    label: "LineDraw5410",
    equation: "X48908607Y-139256507D01"
  },
  {
    label: "LineDraw5411",
    equation: "X48904474Y-139259610D01"
  },
  {
    label: "LineDraw5412",
    equation: "X48904471Y-139259612D01"
  },
  {
    label: "LineDraw5413",
    equation: "X48743117Y-139380760D01"
  },
  {
    label: "LineDraw5414",
    equation: "X48729965Y-139390635D01"
  },
  {
    label: "LineDraw5415",
    equation: "X48726393Y-139394373D01"
  },
  {
    label: "LineDraw5416",
    equation: "X48634105Y-139490947D01"
  },
  {
    label: "LineDraw5417",
    equation: "X48575629Y-139552138D01"
  },
  {
    label: "LineDraw5418",
    equation: "X48469953Y-139707054D01"
  },
  {
    label: "LineDraw5419",
    equation: "X48451222Y-139734512D01"
  },
  {
    label: "LineDraw5420",
    equation: "X48396311Y-139779515D01"
  },
  {
    label: "LineDraw5421",
    equation: "X48382283Y-139784506D01"
  },
  {
    label: "LineDraw5422",
    equation: "X48380655Y-139784979D01"
  },
  {
    label: "LineDraw5423",
    equation: "X48361306Y-139788986D01"
  },
  {
    label: "LineDraw5424",
    equation: "X48349068Y-139790532D01"
  },
  {
    label: "LineDraw5425",
    equation: "X48349066Y-139790533D01"
  },
  {
    label: "LineDraw5426",
    equation: "X48341203Y-139791526D01"
  },
  {
    label: "LineDraw5427",
    equation: "X48300086Y-139807806D01"
  },
  {
    label: "LineDraw5428",
    equation: "X48288885Y-139811641D01"
  },
  {
    label: "LineDraw5429",
    equation: "X48246406Y-139823982D01"
  },
  {
    label: "LineDraw5430",
    equation: "X48239587Y-139828015D01"
  },
  {
    label: "LineDraw5431",
    equation: "X48239582Y-139828017D01"
  },
  {
    label: "LineDraw5432",
    equation: "X48228971Y-139834293D01"
  },
  {
    label: "LineDraw5433",
    equation: "X48211221Y-139842990D01"
  },
  {
    label: "LineDraw5434",
    equation: "X48192383Y-139850448D01"
  },
  {
    label: "LineDraw5435",
    equation: "X48185967Y-139855109D01"
  },
  {
    label: "LineDraw5436",
    equation: "X48185966Y-139855110D01"
  },
  {
    label: "LineDraw5437",
    equation: "X48156625Y-139876428D01"
  },
  {
    label: "LineDraw5438",
    equation: "X48146701Y-139882947D01"
  },
  {
    label: "LineDraw5439",
    equation: "X48115460Y-139901422D01"
  },
  {
    label: "LineDraw5440",
    equation: "X48115455Y-139901426D01"
  },
  {
    label: "LineDraw5441",
    equation: "X48108637Y-139905458D01"
  },
  {
    label: "LineDraw5442",
    equation: "X48094313Y-139919782D01"
  },
  {
    label: "LineDraw5443",
    equation: "X48079281Y-139932621D01"
  },
  {
    label: "LineDraw5444",
    equation: "X48062893Y-139944528D01"
  },
  {
    label: "LineDraw5445",
    equation: "X48041240Y-139970702D01"
  },
  {
    label: "LineDraw5446",
    equation: "X48034712Y-139978593D01"
  },
  {
    label: "LineDraw5447",
    equation: "X48026722Y-139987373D01"
  },
  {
    label: "LineDraw5448",
    equation: "X46157747Y-141856348D01"
  },
  {
    label: "LineDraw5449",
    equation: "X46149461Y-141863888D01"
  },
  {
    label: "LineDraw5450",
    equation: "X46142982Y-141868000D01"
  },
  {
    label: "LineDraw5451",
    equation: "X46137557Y-141873777D01"
  },
  {
    label: "LineDraw5452",
    equation: "X46096357Y-141917651D01"
  },
  {
    label: "LineDraw5453",
    equation: "X46093602Y-141920493D01"
  },
  {
    label: "LineDraw5454",
    equation: "X46073865Y-141940230D01"
  },
  {
    label: "LineDraw5455",
    equation: "X46071385Y-141943427D01"
  },
  {
    label: "LineDraw5456",
    equation: "X46063682Y-141952447D01"
  },
  {
    label: "LineDraw5457",
    equation: "X46033414Y-141984679D01"
  },
  {
    label: "LineDraw5458",
    equation: "X46029595Y-141991625D01"
  },
  {
    label: "LineDraw5459",
    equation: "X46029593Y-141991628D01"
  },
  {
    label: "LineDraw5460",
    equation: "X46023652Y-142002434D01"
  },
  {
    label: "LineDraw5461",
    equation: "X46012801Y-142018953D01"
  },
  {
    label: "LineDraw5462",
    equation: "X46000386Y-142034959D01"
  },
  {
    label: "LineDraw5463",
    equation: "X45997241Y-142042228D01"
  },
  {
    label: "LineDraw5464",
    equation: "X45997238Y-142042232D01"
  },
  {
    label: "LineDraw5465",
    equation: "X45982826Y-142075537D01"
  },
  {
    label: "LineDraw5466",
    equation: "X45977609Y-142086187D01"
  },
  {
    label: "LineDraw5467",
    equation: "X45956305Y-142124940D01"
  },
  {
    label: "LineDraw5468",
    equation: "X45954334Y-142132615D01"
  },
  {
    label: "LineDraw5469",
    equation: "X45954334Y-142132616D01"
  },
  {
    label: "LineDraw5470",
    equation: "X45951267Y-142144562D01"
  },
  {
    label: "LineDraw5471",
    equation: "X45944863Y-142163266D01"
  },
  {
    label: "LineDraw5472",
    equation: "X45936819Y-142181855D01"
  },
  {
    label: "LineDraw5473",
    equation: "X45935580Y-142189678D01"
  },
  {
    label: "LineDraw5474",
    equation: "X45935577Y-142189688D01"
  },
  {
    label: "LineDraw5475",
    equation: "X45929901Y-142225524D01"
  },
  {
    label: "LineDraw5476",
    equation: "X45927495Y-142237144D01"
  },
  {
    label: "LineDraw5477",
    equation: "X45916500Y-142279970D01"
  },
  {
    label: "LineDraw5478",
    equation: "X45916500Y-142300224D01"
  },
  {
    label: "LineDraw5479",
    equation: "X45914949Y-142319934D01"
  },
  {
    label: "LineDraw5480",
    equation: "X45911780Y-142339943D01"
  },
  {
    label: "LineDraw5481",
    equation: "X45912526Y-142347835D01"
  },
  {
    label: "LineDraw5482",
    equation: "X45915941Y-142383961D01"
  },
  {
    label: "LineDraw5483",
    equation: "X45916500Y-142395819D01"
  },
  {
    label: "LineDraw5484",
    equation: "X45916500Y-142871232D01"
  },
  {
    label: "LineDraw5485",
    equation: "X45915972Y-142882421D01"
  },
  {
    label: "LineDraw5486",
    equation: "X45914298Y-142889909D01"
  },
  {
    label: "LineDraw5487",
    equation: "X45914539Y-142897579D01"
  },
  {
    label: "LineDraw5488",
    equation: "X45914456Y-142898162D01"
  },
  {
    label: "LineDraw5489",
    equation: "X45914171Y-142901789D01"
  },
  {
    label: "LineDraw5490",
    equation: "X45914162Y-142902374D01"
  },
  {
    label: "LineDraw5491",
    equation: "X45912725Y-142909906D01"
  },
  {
    label: "LineDraw5492",
    equation: "X45913223Y-142917816D01"
  },
  {
    label: "LineDraw5493",
    equation: "X45916251Y-142965951D01"
  },
  {
    label: "LineDraw5494",
    equation: "X45916500Y-142973862D01"
  },
  {
    label: "LineDraw5495",
    equation: "X45916500Y-142989856D01"
  },
  {
    label: "LineDraw5496",
    equation: "X45916997Y-142993790D01"
  },
  {
    label: "LineDraw5497",
    equation: "X45916997Y-142993791D01"
  },
  {
    label: "LineDraw5498",
    equation: "X45917005Y-142993856D01"
  },
  {
    label: "LineDraw5499",
    equation: "X45917938Y-143005693D01"
  },
  {
    label: "LineDraw5500",
    equation: "X45919327Y-143049889D01"
  },
  {
    label: "LineDraw5501",
    equation: "X45921468Y-143057258D01"
  },
  {
    label: "LineDraw5502",
    equation: "X45921532Y-143057840D01"
  },
  {
    label: "LineDraw5503",
    equation: "X45922156Y-143061422D01"
  },
  {
    label: "LineDraw5504",
    equation: "X45922293Y-143061992D01"
  },
  {
    label: "LineDraw5505",
    equation: "X45922775Y-143069650D01"
  },
  {
    label: "LineDraw5506",
    equation: "X45925224Y-143077187D01"
  },
  {
    label: "LineDraw5507",
    equation: "X45925224Y-143077188D01"
  },
  {
    label: "LineDraw5508",
    equation: "X45925321Y-143077487D01"
  },
  {
    label: "LineDraw5509",
    equation: "X45930494Y-143100631D01"
  },
  {
    label: "LineDraw5510",
    equation: "X45930532Y-143100935D01"
  },
  {
    label: "LineDraw5511",
    equation: "X45930533Y-143100940D01"
  },
  {
    label: "LineDraw5512",
    equation: "X45931526Y-143108797D01"
  },
  {
    label: "LineDraw5513",
    equation: "X45934443Y-143116163D01"
  },
  {
    label: "LineDraw5514",
    equation: "X45934443Y-143116165D01"
  },
  {
    label: "LineDraw5515",
    equation: "X45947804Y-143149912D01"
  },
  {
    label: "LineDraw5516",
    equation: "X45951649Y-143161142D01"
  },
  {
    label: "LineDraw5517",
    equation: "X45963982Y-143203593D01"
  },
  {
    label: "LineDraw5518",
    equation: "X45967886Y-143210194D01"
  },
  {
    label: "LineDraw5519",
    equation: "X45968098Y-143210756D01"
  },
  {
    label: "LineDraw5520",
    equation: "X45969585Y-143214047D01"
  },
  {
    label: "LineDraw5521",
    equation: "X45969863Y-143214572D01"
  },
  {
    label: "LineDraw5522",
    equation: "X45972236Y-143221875D01"
  },
  {
    label: "LineDraw5523",
    equation: "X45976486Y-143228571D01"
  },
  {
    label: "LineDraw5524",
    equation: "X45976486Y-143228572D01"
  },
  {
    label: "LineDraw5525",
    equation: "X45976650Y-143228831D01"
  },
  {
    label: "LineDraw5526",
    equation: "X45987415Y-143249958D01"
  },
  {
    label: "LineDraw5527",
    equation: "X45987527Y-143250242D01"
  },
  {
    label: "LineDraw5528",
    equation: "X45987531Y-143250250D01"
  },
  {
    label: "LineDraw5529",
    equation: "X45990448Y-143257617D01"
  },
  {
    label: "LineDraw5530",
    equation: "X45995108Y-143264031D01"
  },
  {
    label: "LineDraw5531",
    equation: "X46016436Y-143293387D01"
  },
  {
    label: "LineDraw5532",
    equation: "X46022952Y-143303307D01"
  },
  {
    label: "LineDraw5533",
    equation: "X46045458Y-143341362D01"
  },
  {
    label: "LineDraw5534",
    equation: "X46050882Y-143346786D01"
  },
  {
    label: "LineDraw5535",
    equation: "X46051221Y-143347268D01"
  },
  {
    label: "LineDraw5536",
    equation: "X46053492Y-143350103D01"
  },
  {
    label: "LineDraw5537",
    equation: "X46053887Y-143350537D01"
  },
  {
    label: "LineDraw5538",
    equation: "X46058000Y-143357018D01"
  },
  {
    label: "LineDraw5539",
    equation: "X46063778Y-143362444D01"
  },
  {
    label: "LineDraw5540",
    equation: "X46064007Y-143362659D01"
  },
  {
    label: "LineDraw5541",
    equation: "X46079688Y-143380446D01"
  },
  {
    label: "LineDraw5542",
    equation: "X46084528Y-143387107D01"
  },
  {
    label: "LineDraw5543",
    equation: "X46090636Y-143392160D01"
  },
  {
    label: "LineDraw5544",
    equation: "X46090637Y-143392161D01"
  },
  {
    label: "LineDraw5545",
    equation: "X46118593Y-143415288D01"
  },
  {
    label: "LineDraw5546",
    equation: "X46127374Y-143423278D01"
  },
  {
    label: "LineDraw5547",
    equation: "X46619596Y-143915501D01"
  },
  {
    label: "LineDraw5548",
    equation: "X46653621Y-143977813D01"
  },
  {
    label: "LineDraw5549",
    equation: "X46656500Y-144004596D01"
  },
  {
    label: "LineDraw5550",
    equation: "X46656500Y-145645406D01"
  },
  {
    label: "LineDraw5551",
    equation: "X46636498Y-145713527D01"
  },
  {
    label: "LineDraw5552",
    equation: "X46619595Y-145734501D01"
  },
  {
    label: "LineDraw5553",
    equation: "X44897965Y-147456130D01"
  },
  {
    label: "LineDraw5554",
    equation: "X43357747Y-148996348D01"
  },
  {
    label: "LineDraw5555",
    equation: "X43349461Y-149003888D01"
  },
  {
    label: "LineDraw5556",
    equation: "X43342982Y-149008000D01"
  },
  {
    label: "LineDraw5557",
    equation: "X43337557Y-149013777D01"
  },
  {
    label: "LineDraw5558",
    equation: "X43296357Y-149057651D01"
  },
  {
    label: "LineDraw5559",
    equation: "X43293602Y-149060493D01"
  },
  {
    label: "LineDraw5560",
    equation: "X43273865Y-149080230D01"
  },
  {
    label: "LineDraw5561",
    equation: "X43271385Y-149083427D01"
  },
  {
    label: "LineDraw5562",
    equation: "X43263682Y-149092447D01"
  },
  {
    label: "LineDraw5563",
    equation: "X43233414Y-149124679D01"
  },
  {
    label: "LineDraw5564",
    equation: "X43229595Y-149131625D01"
  },
  {
    label: "LineDraw5565",
    equation: "X43229593Y-149131628D01"
  },
  {
    label: "LineDraw5566",
    equation: "X43223652Y-149142434D01"
  },
  {
    label: "LineDraw5567",
    equation: "X43212801Y-149158953D01"
  },
  {
    label: "LineDraw5568",
    equation: "X43200386Y-149174959D01"
  },
  {
    label: "LineDraw5569",
    equation: "X43197241Y-149182228D01"
  },
  {
    label: "LineDraw5570",
    equation: "X43197238Y-149182232D01"
  },
  {
    label: "LineDraw5571",
    equation: "X43182826Y-149215537D01"
  },
  {
    label: "LineDraw5572",
    equation: "X43177609Y-149226187D01"
  },
  {
    label: "LineDraw5573",
    equation: "X43156305Y-149264940D01"
  },
  {
    label: "LineDraw5574",
    equation: "X43154334Y-149272615D01"
  },
  {
    label: "LineDraw5575",
    equation: "X43154334Y-149272616D01"
  },
  {
    label: "LineDraw5576",
    equation: "X43151267Y-149284562D01"
  },
  {
    label: "LineDraw5577",
    equation: "X43144863Y-149303266D01"
  },
  {
    label: "LineDraw5578",
    equation: "X43136819Y-149321855D01"
  },
  {
    label: "LineDraw5579",
    equation: "X43135580Y-149329678D01"
  },
  {
    label: "LineDraw5580",
    equation: "X43135577Y-149329688D01"
  },
  {
    label: "LineDraw5581",
    equation: "X43129901Y-149365524D01"
  },
  {
    label: "LineDraw5582",
    equation: "X43127495Y-149377144D01"
  },
  {
    label: "LineDraw5583",
    equation: "X43116500Y-149419970D01"
  },
  {
    label: "LineDraw5584",
    equation: "X43116500Y-149440224D01"
  },
  {
    label: "LineDraw5585",
    equation: "X43114949Y-149459934D01"
  },
  {
    label: "LineDraw5586",
    equation: "X43111780Y-149479943D01"
  },
  {
    label: "LineDraw5587",
    equation: "X40686000Y-149479943D01"
  },
  {
    label: "LineDraw5588",
    equation: "X40686000Y-89704200D01"
  },
  {
    label: "LineDraw5589",
    equation: "X47644908Y-89704200D01"
  },
  {
    label: "LineDraw5590",
    equation: "X47671004Y-90055358D01"
  },
  {
    label: "LineDraw5591",
    equation: "X47736684Y-90401304D01"
  },
  {
    label: "LineDraw5592",
    equation: "X47841104Y-90737592D01"
  },
  {
    label: "LineDraw5593",
    equation: "X47982921Y-91059897D01"
  },
  {
    label: "LineDraw5594",
    equation: "X48160313Y-91364076D01"
  },
  {
    label: "LineDraw5595",
    equation: "X48370999Y-91646219D01"
  },
  {
    label: "LineDraw5596",
    equation: "X48373443Y-91648817D01"
  },
  {
    label: "LineDraw5597",
    equation: "X48373448Y-91648823D01"
  },
  {
    label: "LineDraw5598",
    equation: "X48609820Y-91900093D01"
  },
  {
    label: "LineDraw5599",
    equation: "X48612270Y-91902697D01"
  },
  {
    label: "LineDraw5600",
    equation: "X48614999Y-91905007D01"
  },
  {
    label: "LineDraw5601",
    equation: "X48804652Y-92065560D01"
  },
  {
    label: "LineDraw5602",
    equation: "X48881024Y-92130214D01"
  },
  {
    label: "LineDraw5603",
    equation: "X49173807Y-92325845D01"
  },
  {
    label: "LineDraw5604",
    equation: "X49176989Y-92327484D01"
  },
  {
    label: "LineDraw5605",
    equation: "X49176991Y-92327485D01"
  },
  {
    label: "LineDraw5606",
    equation: "X49483670Y-92485436D01"
  },
  {
    label: "LineDraw5607",
    equation: "X49483675Y-92485438D01"
  },
  {
    label: "LineDraw5608",
    equation: "X49486853Y-92487075D01"
  },
  {
    label: "LineDraw5609",
    equation: "X49490194Y-92488341D01"
  },
  {
    label: "LineDraw5610",
    equation: "X49490199Y-92488343D01"
  },
  {
    label: "LineDraw5611",
    equation: "X49721696Y-92576049D01"
  },
  {
    label: "LineDraw5612",
    equation: "X49816139Y-92611830D01"
  },
  {
    label: "LineDraw5613",
    equation: "X49819603Y-92612710D01"
  },
  {
    label: "LineDraw5614",
    equation: "X49819607Y-92612711D01"
  },
  {
    label: "LineDraw5615",
    equation: "X50153963Y-92697627D01"
  },
  {
    label: "LineDraw5616",
    equation: "X50153971Y-92697629D01"
  },
  {
    label: "LineDraw5617",
    equation: "X50157430Y-92698507D01"
  },
  {
    label: "LineDraw5618",
    equation: "X50329152Y-92721878D01"
  },
  {
    label: "LineDraw5619",
    equation: "X50503347Y-92745585D01"
  },
  {
    label: "LineDraw5620",
    equation: "X50503354Y-92745586D01"
  },
  {
    label: "LineDraw5621",
    equation: "X50506340Y-92745992D01"
  },
  {
    label: "LineDraw5622",
    equation: "X50621081Y-92750500D01"
  },
  {
    label: "LineDraw5623",
    equation: "X50839198Y-92750500D01"
  },
  {
    label: "LineDraw5624",
    equation: "X50980756Y-92742462D01"
  },
  {
    label: "LineDraw5625",
    equation: "X51097992Y-92735805D01"
  },
  {
    label: "LineDraw5626",
    equation: "X51097999Y-92735804D01"
  },
  {
    label: "LineDraw5627",
    equation: "X51101560Y-92735602D01"
  },
  {
    label: "LineDraw5628",
    equation: "X51239883Y-92711834D01"
  },
  {
    label: "LineDraw5629",
    equation: "X51445082Y-92676575D01"
  },
  {
    label: "LineDraw5630",
    equation: "X51445090Y-92676573D01"
  },
  {
    label: "LineDraw5631",
    equation: "X51448600Y-92675970D01"
  },
  {
    label: "LineDraw5632",
    equation: "X51452025Y-92674972D01"
  },
  {
    label: "LineDraw5633",
    equation: "X51452028Y-92674971D01"
  },
  {
    label: "LineDraw5634",
    equation: "X51783221Y-92578436D01"
  },
  {
    label: "LineDraw5635",
    equation: "X51786659Y-92577434D01"
  },
  {
    label: "LineDraw5636",
    equation: "X52111390Y-92441263D01"
  },
  {
    label: "LineDraw5637",
    equation: "X52314556Y-92327485D01"
  },
  {
    label: "LineDraw5638",
    equation: "X52415502Y-92270953D01"
  },
  {
    label: "LineDraw5639",
    equation: "X52415507Y-92270950D01"
  },
  {
    label: "LineDraw5640",
    equation: "X52418619Y-92269207D01"
  },
  {
    label: "LineDraw5641",
    equation: "X52421515Y-92267122D01"
  },
  {
    label: "LineDraw5642",
    equation: "X52421520Y-92267119D01"
  },
  {
    label: "LineDraw5643",
    equation: "X52568239Y-92161496D01"
  },
  {
    label: "LineDraw5644",
    equation: "X52704395Y-92063477D01"
  },
  {
    label: "LineDraw5645",
    equation: "X52878858Y-91905007D01"
  },
  {
    label: "LineDraw5646",
    equation: "X52962405Y-91829118D01"
  },
  {
    label: "LineDraw5647",
    equation: "X52962406Y-91829117D01"
  },
  {
    label: "LineDraw5648",
    equation: "X52965046Y-91826719D01"
  },
  {
    label: "LineDraw5649",
    equation: "X53197219Y-91561977D01"
  },
  {
    label: "LineDraw5650",
    equation: "X53397929Y-91272653D01"
  },
  {
    label: "LineDraw5651",
    equation: "X53564598Y-90962468D01"
  },
  {
    label: "LineDraw5652",
    equation: "X53695081Y-90635410D01"
  },
  {
    label: "LineDraw5653",
    equation: "X53787701Y-90295683D01"
  },
  {
    label: "LineDraw5654",
    equation: "X53841268Y-89947655D01"
  },
  {
    label: "LineDraw5655",
    equation: "X53850833Y-89704200D01"
  },
  {
    label: "LineDraw5656",
    equation: "X70744908Y-89704200D01"
  },
  {
    label: "LineDraw5657",
    equation: "X70771004Y-90055358D01"
  },
  {
    label: "LineDraw5658",
    equation: "X70836684Y-90401304D01"
  },
  {
    label: "LineDraw5659",
    equation: "X70941104Y-90737592D01"
  },
  {
    label: "LineDraw5660",
    equation: "X71082921Y-91059897D01"
  },
  {
    label: "LineDraw5661",
    equation: "X71260313Y-91364076D01"
  },
  {
    label: "LineDraw5662",
    equation: "X71470999Y-91646219D01"
  },
  {
    label: "LineDraw5663",
    equation: "X71473443Y-91648817D01"
  },
  {
    label: "LineDraw5664",
    equation: "X71473448Y-91648823D01"
  },
  {
    label: "LineDraw5665",
    equation: "X71709820Y-91900093D01"
  },
  {
    label: "LineDraw5666",
    equation: "X71712270Y-91902697D01"
  },
  {
    label: "LineDraw5667",
    equation: "X71714999Y-91905007D01"
  },
  {
    label: "LineDraw5668",
    equation: "X71904652Y-92065560D01"
  },
  {
    label: "LineDraw5669",
    equation: "X71981024Y-92130214D01"
  },
  {
    label: "LineDraw5670",
    equation: "X72273807Y-92325845D01"
  },
  {
    label: "LineDraw5671",
    equation: "X72276989Y-92327484D01"
  },
  {
    label: "LineDraw5672",
    equation: "X72276991Y-92327485D01"
  },
  {
    label: "LineDraw5673",
    equation: "X72583670Y-92485436D01"
  },
  {
    label: "LineDraw5674",
    equation: "X72583675Y-92485438D01"
  },
  {
    label: "LineDraw5675",
    equation: "X72586853Y-92487075D01"
  },
  {
    label: "LineDraw5676",
    equation: "X72590194Y-92488341D01"
  },
  {
    label: "LineDraw5677",
    equation: "X72590199Y-92488343D01"
  },
  {
    label: "LineDraw5678",
    equation: "X72821696Y-92576049D01"
  },
  {
    label: "LineDraw5679",
    equation: "X72916139Y-92611830D01"
  },
  {
    label: "LineDraw5680",
    equation: "X72919603Y-92612710D01"
  },
  {
    label: "LineDraw5681",
    equation: "X72919607Y-92612711D01"
  },
  {
    label: "LineDraw5682",
    equation: "X73253963Y-92697627D01"
  },
  {
    label: "LineDraw5683",
    equation: "X73253971Y-92697629D01"
  },
  {
    label: "LineDraw5684",
    equation: "X73257430Y-92698507D01"
  },
  {
    label: "LineDraw5685",
    equation: "X73429152Y-92721878D01"
  },
  {
    label: "LineDraw5686",
    equation: "X73603347Y-92745585D01"
  },
  {
    label: "LineDraw5687",
    equation: "X73603354Y-92745586D01"
  },
  {
    label: "LineDraw5688",
    equation: "X73606340Y-92745992D01"
  },
  {
    label: "LineDraw5689",
    equation: "X73721081Y-92750500D01"
  },
  {
    label: "LineDraw5690",
    equation: "X73939198Y-92750500D01"
  },
  {
    label: "LineDraw5691",
    equation: "X74080756Y-92742462D01"
  },
  {
    label: "LineDraw5692",
    equation: "X74197992Y-92735805D01"
  },
  {
    label: "LineDraw5693",
    equation: "X74197999Y-92735804D01"
  },
  {
    label: "LineDraw5694",
    equation: "X74201560Y-92735602D01"
  },
  {
    label: "LineDraw5695",
    equation: "X74339883Y-92711834D01"
  },
  {
    label: "LineDraw5696",
    equation: "X74545082Y-92676575D01"
  },
  {
    label: "LineDraw5697",
    equation: "X74545090Y-92676573D01"
  },
  {
    label: "LineDraw5698",
    equation: "X74548600Y-92675970D01"
  },
  {
    label: "LineDraw5699",
    equation: "X74552025Y-92674972D01"
  },
  {
    label: "LineDraw5700",
    equation: "X74552028Y-92674971D01"
  },
  {
    label: "LineDraw5701",
    equation: "X74883221Y-92578436D01"
  },
  {
    label: "LineDraw5702",
    equation: "X74886659Y-92577434D01"
  },
  {
    label: "LineDraw5703",
    equation: "X75211390Y-92441263D01"
  },
  {
    label: "LineDraw5704",
    equation: "X75414556Y-92327485D01"
  },
  {
    label: "LineDraw5705",
    equation: "X75515502Y-92270953D01"
  },
  {
    label: "LineDraw5706",
    equation: "X75515507Y-92270950D01"
  },
  {
    label: "LineDraw5707",
    equation: "X75518619Y-92269207D01"
  },
  {
    label: "LineDraw5708",
    equation: "X75521515Y-92267122D01"
  },
  {
    label: "LineDraw5709",
    equation: "X75521520Y-92267119D01"
  },
  {
    label: "LineDraw5710",
    equation: "X75668239Y-92161496D01"
  },
  {
    label: "LineDraw5711",
    equation: "X75804395Y-92063477D01"
  },
  {
    label: "LineDraw5712",
    equation: "X75978858Y-91905007D01"
  },
  {
    label: "LineDraw5713",
    equation: "X76062405Y-91829118D01"
  },
  {
    label: "LineDraw5714",
    equation: "X76062406Y-91829117D01"
  },
  {
    label: "LineDraw5715",
    equation: "X76065046Y-91826719D01"
  },
  {
    label: "LineDraw5716",
    equation: "X76297219Y-91561977D01"
  },
  {
    label: "LineDraw5717",
    equation: "X76497929Y-91272653D01"
  },
  {
    label: "LineDraw5718",
    equation: "X76664598Y-90962468D01"
  },
  {
    label: "LineDraw5719",
    equation: "X76795081Y-90635410D01"
  },
  {
    label: "LineDraw5720",
    equation: "X76887701Y-90295683D01"
  },
  {
    label: "LineDraw5721",
    equation: "X76941268Y-89947655D01"
  },
  {
    label: "LineDraw5722",
    equation: "X76950833Y-89704200D01"
  },
  {
    label: "LineDraw5723",
    equation: "X76954952Y-89599370D01"
  },
  {
    label: "LineDraw5724",
    equation: "X76954952Y-89599365D01"
  },
  {
    label: "LineDraw5725",
    equation: "X76955092Y-89595800D01"
  },
  {
    label: "LineDraw5726",
    equation: "X76928996Y-89244642D01"
  },
  {
    label: "LineDraw5727",
    equation: "X76863316Y-88898696D01"
  },
  {
    label: "LineDraw5728",
    equation: "X76758896Y-88562408D01"
  },
  {
    label: "LineDraw5729",
    equation: "X76617079Y-88240103D01"
  },
  {
    label: "LineDraw5730",
    equation: "X76439687Y-87935924D01"
  },
  {
    label: "LineDraw5731",
    equation: "X76229001Y-87653781D01"
  },
  {
    label: "LineDraw5732",
    equation: "X76226557Y-87651183D01"
  },
  {
    label: "LineDraw5733",
    equation: "X76226552Y-87651177D01"
  },
  {
    label: "LineDraw5734",
    equation: "X75990180Y-87399907D01"
  },
  {
    label: "LineDraw5735",
    equation: "X75990176Y-87399904D01"
  },
  {
    label: "LineDraw5736",
    equation: "X75987730Y-87397303D01"
  },
  {
    label: "LineDraw5737",
    equation: "X75797809Y-87236523D01"
  },
  {
    label: "LineDraw5738",
    equation: "X75721698Y-87172090D01"
  },
  {
    label: "LineDraw5739",
    equation: "X75721694Y-87172087D01"
  },
  {
    label: "LineDraw5740",
    equation: "X75718976Y-87169786D01"
  },
  {
    label: "LineDraw5741",
    equation: "X75426193Y-86974155D01"
  },
  {
    label: "LineDraw5742",
    equation: "X75423009Y-86972515D01"
  },
  {
    label: "LineDraw5743",
    equation: "X75116330Y-86814564D01"
  },
  {
    label: "LineDraw5744",
    equation: "X75116325Y-86814562D01"
  },
  {
    label: "LineDraw5745",
    equation: "X75113147Y-86812925D01"
  },
  {
    label: "LineDraw5746",
    equation: "X75109806Y-86811659D01"
  },
  {
    label: "LineDraw5747",
    equation: "X75109801Y-86811657D01"
  },
  {
    label: "LineDraw5748",
    equation: "X74787205Y-86689437D01"
  },
  {
    label: "LineDraw5749",
    equation: "X74787206Y-86689437D01"
  },
  {
    label: "LineDraw5750",
    equation: "X74783861Y-86688170D01"
  },
  {
    label: "LineDraw5751",
    equation: "X74780397Y-86687290D01"
  },
  {
    label: "LineDraw5752",
    equation: "X74780393Y-86687289D01"
  },
  {
    label: "LineDraw5753",
    equation: "X74446037Y-86602373D01"
  },
  {
    label: "LineDraw5754",
    equation: "X74446029Y-86602371D01"
  },
  {
    label: "LineDraw5755",
    equation: "X74442570Y-86601493D01"
  },
  {
    label: "LineDraw5756",
    equation: "X74270848Y-86578122D01"
  },
  {
    label: "LineDraw5757",
    equation: "X74096653Y-86554415D01"
  },
  {
    label: "LineDraw5758",
    equation: "X74096646Y-86554414D01"
  },
  {
    label: "LineDraw5759",
    equation: "X74093660Y-86554008D01"
  },
  {
    label: "LineDraw5760",
    equation: "X73978919Y-86549500D01"
  },
  {
    label: "LineDraw5761",
    equation: "X73760802Y-86549500D01"
  },
  {
    label: "LineDraw5762",
    equation: "X73619244Y-86557538D01"
  },
  {
    label: "LineDraw5763",
    equation: "X73502008Y-86564195D01"
  },
  {
    label: "LineDraw5764",
    equation: "X73502001Y-86564196D01"
  },
  {
    label: "LineDraw5765",
    equation: "X73498440Y-86564398D01"
  },
  {
    label: "LineDraw5766",
    equation: "X73360117Y-86588166D01"
  },
  {
    label: "LineDraw5767",
    equation: "X73154918Y-86623425D01"
  },
  {
    label: "LineDraw5768",
    equation: "X73154910Y-86623427D01"
  },
  {
    label: "LineDraw5769",
    equation: "X73151400Y-86624030D01"
  },
  {
    label: "LineDraw5770",
    equation: "X73147975Y-86625028D01"
  },
  {
    label: "LineDraw5771",
    equation: "X73147972Y-86625029D01"
  },
  {
    label: "LineDraw5772",
    equation: "X72934370Y-86687289D01"
  },
  {
    label: "LineDraw5773",
    equation: "X72813341Y-86722566D01"
  },
  {
    label: "LineDraw5774",
    equation: "X72488610Y-86858737D01"
  },
  {
    label: "LineDraw5775",
    equation: "X72334995Y-86944765D01"
  },
  {
    label: "LineDraw5776",
    equation: "X72184498Y-87029047D01"
  },
  {
    label: "LineDraw5777",
    equation: "X72184493Y-87029050D01"
  },
  {
    label: "LineDraw5778",
    equation: "X72181381Y-87030793D01"
  },
  {
    label: "LineDraw5779",
    equation: "X72178485Y-87032878D01"
  },
  {
    label: "LineDraw5780",
    equation: "X72178480Y-87032881D01"
  },
  {
    label: "LineDraw5781",
    equation: "X72031761Y-87138504D01"
  },
  {
    label: "LineDraw5782",
    equation: "X71895605Y-87236523D01"
  },
  {
    label: "LineDraw5783",
    equation: "X71892969Y-87238917D01"
  },
  {
    label: "LineDraw5784",
    equation: "X71892967Y-87238919D01"
  },
  {
    label: "LineDraw5785",
    equation: "X71715733Y-87399907D01"
  },
  {
    label: "LineDraw5786",
    equation: "X71634954Y-87473281D01"
  },
  {
    label: "LineDraw5787",
    equation: "X71402781Y-87738023D01"
  },
  {
    label: "LineDraw5788",
    equation: "X71202071Y-88027347D01"
  },
  {
    label: "LineDraw5789",
    equation: "X71035402Y-88337532D01"
  },
  {
    label: "LineDraw5790",
    equation: "X70904919Y-88664590D01"
  },
  {
    label: "LineDraw5791",
    equation: "X70812299Y-89004317D01"
  },
  {
    label: "LineDraw5792",
    equation: "X70758732Y-89352345D01"
  },
  {
    label: "LineDraw5793",
    equation: "X70758592Y-89355909D01"
  },
  {
    label: "LineDraw5794",
    equation: "X70749027Y-89599370D01"
  },
  {
    label: "LineDraw5795",
    equation: "X70744908Y-89704200D01"
  },
  {
    label: "LineDraw5796",
    equation: "X53850833Y-89704200D01"
  },
  {
    label: "LineDraw5797",
    equation: "X53854952Y-89599370D01"
  },
  {
    label: "LineDraw5798",
    equation: "X53854952Y-89599365D01"
  },
  {
    label: "LineDraw5799",
    equation: "X53855092Y-89595800D01"
  },
  {
    label: "LineDraw5800",
    equation: "X53828996Y-89244642D01"
  },
  {
    label: "LineDraw5801",
    equation: "X53763316Y-88898696D01"
  },
  {
    label: "LineDraw5802",
    equation: "X53658896Y-88562408D01"
  },
  {
    label: "LineDraw5803",
    equation: "X53517079Y-88240103D01"
  },
  {
    label: "LineDraw5804",
    equation: "X53339687Y-87935924D01"
  },
  {
    label: "LineDraw5805",
    equation: "X53129001Y-87653781D01"
  },
  {
    label: "LineDraw5806",
    equation: "X53126557Y-87651183D01"
  },
  {
    label: "LineDraw5807",
    equation: "X53126552Y-87651177D01"
  },
  {
    label: "LineDraw5808",
    equation: "X52890180Y-87399907D01"
  },
  {
    label: "LineDraw5809",
    equation: "X52890176Y-87399904D01"
  },
  {
    label: "LineDraw5810",
    equation: "X52887730Y-87397303D01"
  },
  {
    label: "LineDraw5811",
    equation: "X52697809Y-87236523D01"
  },
  {
    label: "LineDraw5812",
    equation: "X52621698Y-87172090D01"
  },
  {
    label: "LineDraw5813",
    equation: "X52621694Y-87172087D01"
  },
  {
    label: "LineDraw5814",
    equation: "X52618976Y-87169786D01"
  },
  {
    label: "LineDraw5815",
    equation: "X52326193Y-86974155D01"
  },
  {
    label: "LineDraw5816",
    equation: "X52323009Y-86972515D01"
  },
  {
    label: "LineDraw5817",
    equation: "X52016330Y-86814564D01"
  },
  {
    label: "LineDraw5818",
    equation: "X52016325Y-86814562D01"
  },
  {
    label: "LineDraw5819",
    equation: "X52013147Y-86812925D01"
  },
  {
    label: "LineDraw5820",
    equation: "X52009806Y-86811659D01"
  },
  {
    label: "LineDraw5821",
    equation: "X52009801Y-86811657D01"
  },
  {
    label: "LineDraw5822",
    equation: "X51687205Y-86689437D01"
  },
  {
    label: "LineDraw5823",
    equation: "X51687206Y-86689437D01"
  },
  {
    label: "LineDraw5824",
    equation: "X51683861Y-86688170D01"
  },
  {
    label: "LineDraw5825",
    equation: "X51680397Y-86687290D01"
  },
  {
    label: "LineDraw5826",
    equation: "X51680393Y-86687289D01"
  },
  {
    label: "LineDraw5827",
    equation: "X51346037Y-86602373D01"
  },
  {
    label: "LineDraw5828",
    equation: "X51346029Y-86602371D01"
  },
  {
    label: "LineDraw5829",
    equation: "X51342570Y-86601493D01"
  },
  {
    label: "LineDraw5830",
    equation: "X51170848Y-86578122D01"
  },
  {
    label: "LineDraw5831",
    equation: "X50996653Y-86554415D01"
  },
  {
    label: "LineDraw5832",
    equation: "X50996646Y-86554414D01"
  },
  {
    label: "LineDraw5833",
    equation: "X50993660Y-86554008D01"
  },
  {
    label: "LineDraw5834",
    equation: "X50878919Y-86549500D01"
  },
  {
    label: "LineDraw5835",
    equation: "X50660802Y-86549500D01"
  },
  {
    label: "LineDraw5836",
    equation: "X50519244Y-86557538D01"
  },
  {
    label: "LineDraw5837",
    equation: "X50402008Y-86564195D01"
  },
  {
    label: "LineDraw5838",
    equation: "X50402001Y-86564196D01"
  },
  {
    label: "LineDraw5839",
    equation: "X50398440Y-86564398D01"
  },
  {
    label: "LineDraw5840",
    equation: "X50260117Y-86588166D01"
  },
  {
    label: "LineDraw5841",
    equation: "X50054918Y-86623425D01"
  },
  {
    label: "LineDraw5842",
    equation: "X50054910Y-86623427D01"
  },
  {
    label: "LineDraw5843",
    equation: "X50051400Y-86624030D01"
  },
  {
    label: "LineDraw5844",
    equation: "X50047975Y-86625028D01"
  },
  {
    label: "LineDraw5845",
    equation: "X50047972Y-86625029D01"
  },
  {
    label: "LineDraw5846",
    equation: "X49834370Y-86687289D01"
  },
  {
    label: "LineDraw5847",
    equation: "X49713341Y-86722566D01"
  },
  {
    label: "LineDraw5848",
    equation: "X49388610Y-86858737D01"
  },
  {
    label: "LineDraw5849",
    equation: "X49234995Y-86944765D01"
  },
  {
    label: "LineDraw5850",
    equation: "X49084498Y-87029047D01"
  },
  {
    label: "LineDraw5851",
    equation: "X49084493Y-87029050D01"
  },
  {
    label: "LineDraw5852",
    equation: "X49081381Y-87030793D01"
  },
  {
    label: "LineDraw5853",
    equation: "X49078485Y-87032878D01"
  },
  {
    label: "LineDraw5854",
    equation: "X49078480Y-87032881D01"
  },
  {
    label: "LineDraw5855",
    equation: "X48931761Y-87138504D01"
  },
  {
    label: "LineDraw5856",
    equation: "X48795605Y-87236523D01"
  },
  {
    label: "LineDraw5857",
    equation: "X48792969Y-87238917D01"
  },
  {
    label: "LineDraw5858",
    equation: "X48792967Y-87238919D01"
  },
  {
    label: "LineDraw5859",
    equation: "X48615733Y-87399907D01"
  },
  {
    label: "LineDraw5860",
    equation: "X48534954Y-87473281D01"
  },
  {
    label: "LineDraw5861",
    equation: "X48302781Y-87738023D01"
  },
  {
    label: "LineDraw5862",
    equation: "X48102071Y-88027347D01"
  },
  {
    label: "LineDraw5863",
    equation: "X47935402Y-88337532D01"
  },
  {
    label: "LineDraw5864",
    equation: "X47804919Y-88664590D01"
  },
  {
    label: "LineDraw5865",
    equation: "X47712299Y-89004317D01"
  },
  {
    label: "LineDraw5866",
    equation: "X47658732Y-89352345D01"
  },
  {
    label: "LineDraw5867",
    equation: "X47658592Y-89355909D01"
  },
  {
    label: "LineDraw5868",
    equation: "X47649027Y-89599370D01"
  },
  {
    label: "LineDraw5869",
    equation: "X47644908Y-89704200D01"
  },
  {
    label: "LineDraw5870",
    equation: "X40686000Y-89704200D01"
  },
  {
    label: "LineDraw5871",
    equation: "X40686000Y-85888000D01"
  },
  {
    label: "LineDraw5872",
    equation: "X40706002Y-85819879D01"
  },
  {
    label: "LineDraw5873",
    equation: "X40759658Y-85773386D01"
  },
  {
    label: "LineDraw5874",
    equation: "X40812000Y-85762000D01"
  },
  {
    label: "LineDraw5875",
    equation: "X118919000Y-85762000D01"
  },
  {
    label: "LineDraw5876",
    equation: "X118987121Y-85782002D01"
  },
  {
    label: "Line5877",
    equation: "X93837147Y-115927050D02"
  },
  {
    label: "Line5878",
    equation: "G01D02"
  },
  {
    label: "LineDraw5879",
    equation: "X93881809Y-115982239D01"
  },
  {
    label: "LineDraw5880",
    equation: "X93891500Y-116030697D01"
  },
  {
    label: "LineDraw5881",
    equation: "X93891500Y-121445761D01"
  },
  {
    label: "LineDraw5882",
    equation: "X93871498Y-121513882D01"
  },
  {
    label: "LineDraw5883",
    equation: "X93854595Y-121534856D01"
  },
  {
    label: "LineDraw5884",
    equation: "X90284856Y-125104595D01"
  },
  {
    label: "LineDraw5885",
    equation: "X90222544Y-125138621D01"
  },
  {
    label: "LineDraw5886",
    equation: "X90195761Y-125141500D01"
  },
  {
    label: "LineDraw5887",
    equation: "X76334751Y-125141500D01"
  },
  {
    label: "LineDraw5888",
    equation: "X76266630Y-125121498D01"
  },
  {
    label: "LineDraw5889",
    equation: "X76262157Y-125118276D01"
  },
  {
    label: "LineDraw5890",
    equation: "X76259815Y-125115918D01"
  },
  {
    label: "LineDraw5891",
    equation: "X76106666Y-125018727D01"
  },
  {
    label: "LineDraw5892",
    equation: "X76077463Y-125008328D01"
  },
  {
    label: "LineDraw5893",
    equation: "X75942425Y-124960243D01"
  },
  {
    label: "LineDraw5894",
    equation: "X75942420Y-124960242D01"
  },
  {
    label: "LineDraw5895",
    equation: "X75935790Y-124957881D01"
  },
  {
    label: "LineDraw5896",
    equation: "X75928802Y-124957048D01"
  },
  {
    label: "LineDraw5897",
    equation: "X75928799Y-124957047D01"
  },
  {
    label: "LineDraw5898",
    equation: "X75762675Y-124937238D01"
  },
  {
    label: "LineDraw5899",
    equation: "X75762674Y-124937238D01"
  },
  {
    label: "LineDraw5900",
    equation: "X75756129Y-124936457D01"
  },
  {
    label: "LineDraw5901",
    equation: "X75756127Y-124936457D01"
  },
  {
    label: "LineDraw5902",
    equation: "X75755680Y-124936404D01"
  },
  {
    label: "LineDraw5903",
    equation: "X75755689Y-124936326D01"
  },
  {
    label: "LineDraw5904",
    equation: "X75690646Y-124916736D01"
  },
  {
    label: "LineDraw5905",
    equation: "X75644526Y-124862759D01"
  },
  {
    label: "LineDraw5906",
    equation: "X75633500Y-124811213D01"
  },
  {
    label: "LineDraw5907",
    equation: "X75633500Y-116548240D01"
  },
  {
    label: "LineDraw5908",
    equation: "X75653502Y-116480119D01"
  },
  {
    label: "LineDraw5909",
    equation: "X75707158Y-116433626D01"
  },
  {
    label: "LineDraw5910",
    equation: "X75777432Y-116423522D01"
  },
  {
    label: "LineDraw5911",
    equation: "X75842012Y-116453016D01"
  },
  {
    label: "LineDraw5912",
    equation: "X75848595Y-116459144D01"
  },
  {
    label: "LineDraw5913",
    equation: "X76535681Y-117146229D01"
  },
  {
    label: "LineDraw5914",
    equation: "X76546549Y-117158621D01"
  },
  {
    label: "LineDraw5915",
    equation: "X76566013Y-117183987D01"
  },
  {
    label: "LineDraw5916",
    equation: "X76572559Y-117189010D01"
  },
  {
    label: "LineDraw5917",
    equation: "X76572562Y-117189013D01"
  },
  {
    label: "LineDraw5918",
    equation: "X76597927Y-117208476D01"
  },
  {
    label: "LineDraw5919",
    equation: "X76597929Y-117208477D01"
  },
  {
    label: "LineDraw5920",
    equation: "X76613117Y-117220131D01"
  },
  {
    label: "LineDraw5921",
    equation: "X76693124Y-117281524D01"
  },
  {
    label: "LineDraw5922",
    equation: "X76700750Y-117284683D01"
  },
  {
    label: "LineDraw5923",
    equation: "X76700752Y-117284684D01"
  },
  {
    label: "LineDraw5924",
    equation: "X76767136Y-117312181D01"
  },
  {
    label: "LineDraw5925",
    equation: "X76841149Y-117342838D01"
  },
  {
    label: "LineDraw5926",
    equation: "X76849336Y-117343916D01"
  },
  {
    label: "LineDraw5927",
    equation: "X76849337Y-117343916D01"
  },
  {
    label: "LineDraw5928",
    equation: "X76860542Y-117345391D01"
  },
  {
    label: "LineDraw5929",
    equation: "X76883026Y-117348351D01"
  },
  {
    label: "LineDraw5930",
    equation: "X76960115Y-117358500D01"
  },
  {
    label: "LineDraw5931",
    equation: "X76960118Y-117358500D01"
  },
  {
    label: "LineDraw5932",
    equation: "X76960126Y-117358501D01"
  },
  {
    label: "LineDraw5933",
    equation: "X76991811Y-117362672D01"
  },
  {
    label: "LineDraw5934",
    equation: "X77000000Y-117363750D01"
  },
  {
    label: "LineDraw5935",
    equation: "X77031693Y-117359578D01"
  },
  {
    label: "LineDraw5936",
    equation: "X77048136Y-117358500D01"
  },
  {
    label: "LineDraw5937",
    equation: "X87806686Y-117358500D01"
  },
  {
    label: "LineDraw5938",
    equation: "X87838021Y-117362459D01"
  },
  {
    label: "LineDraw5939",
    equation: "X87919970Y-117383500D01"
  },
  {
    label: "LineDraw5940",
    equation: "X91671233Y-117383500D01"
  },
  {
    label: "LineDraw5941",
    equation: "X91682416Y-117384027D01"
  },
  {
    label: "LineDraw5942",
    equation: "X91689909Y-117385702D01"
  },
  {
    label: "LineDraw5943",
    equation: "X91697835Y-117385453D01"
  },
  {
    label: "LineDraw5944",
    equation: "X91697836Y-117385453D01"
  },
  {
    label: "LineDraw5945",
    equation: "X91757986Y-117383562D01"
  },
  {
    label: "LineDraw5946",
    equation: "X91761945Y-117383500D01"
  },
  {
    label: "LineDraw5947",
    equation: "X91789856Y-117383500D01"
  },
  {
    label: "LineDraw5948",
    equation: "X91793791Y-117383003D01"
  },
  {
    label: "LineDraw5949",
    equation: "X91793856Y-117382995D01"
  },
  {
    label: "LineDraw5950",
    equation: "X91805693Y-117382062D01"
  },
  {
    label: "LineDraw5951",
    equation: "X91837951Y-117381048D01"
  },
  {
    label: "LineDraw5952",
    equation: "X91841970Y-117380922D01"
  },
  {
    label: "LineDraw5953",
    equation: "X91849889Y-117380673D01"
  },
  {
    label: "LineDraw5954",
    equation: "X91869343Y-117375021D01"
  },
  {
    label: "LineDraw5955",
    equation: "X91888700Y-117371013D01"
  },
  {
    label: "LineDraw5956",
    equation: "X91900930Y-117369468D01"
  },
  {
    label: "LineDraw5957",
    equation: "X91900931Y-117369468D01"
  },
  {
    label: "LineDraw5958",
    equation: "X91908797Y-117368474D01"
  },
  {
    label: "LineDraw5959",
    equation: "X91916168Y-117365555D01"
  },
  {
    label: "LineDraw5960",
    equation: "X91916170Y-117365555D01"
  },
  {
    label: "LineDraw5961",
    equation: "X91949912Y-117352196D01"
  },
  {
    label: "LineDraw5962",
    equation: "X91961142Y-117348351D01"
  },
  {
    label: "LineDraw5963",
    equation: "X91995983Y-117338229D01"
  },
  {
    label: "LineDraw5964",
    equation: "X91995984Y-117338229D01"
  },
  {
    label: "LineDraw5965",
    equation: "X92003593Y-117336018D01"
  },
  {
    label: "LineDraw5966",
    equation: "X92010412Y-117331985D01"
  },
  {
    label: "LineDraw5967",
    equation: "X92010417Y-117331983D01"
  },
  {
    label: "LineDraw5968",
    equation: "X92021028Y-117325707D01"
  },
  {
    label: "LineDraw5969",
    equation: "X92038776Y-117317012D01"
  },
  {
    label: "LineDraw5970",
    equation: "X92057617Y-117309552D01"
  },
  {
    label: "LineDraw5971",
    equation: "X92093387Y-117283564D01"
  },
  {
    label: "LineDraw5972",
    equation: "X92103307Y-117277048D01"
  },
  {
    label: "LineDraw5973",
    equation: "X92134535Y-117258580D01"
  },
  {
    label: "LineDraw5974",
    equation: "X92134538Y-117258578D01"
  },
  {
    label: "LineDraw5975",
    equation: "X92141362Y-117254542D01"
  },
  {
    label: "LineDraw5976",
    equation: "X92155683Y-117240221D01"
  },
  {
    label: "LineDraw5977",
    equation: "X92170717Y-117227380D01"
  },
  {
    label: "LineDraw5978",
    equation: "X92180694Y-117220131D01"
  },
  {
    label: "LineDraw5979",
    equation: "X92187107Y-117215472D01"
  },
  {
    label: "LineDraw5980",
    equation: "X92215298Y-117181395D01"
  },
  {
    label: "LineDraw5981",
    equation: "X92223288Y-117172616D01"
  },
  {
    label: "LineDraw5982",
    equation: "X93310177Y-116085727D01"
  },
  {
    label: "LineDraw5983",
    equation: "X93372489Y-116051701D01"
  },
  {
    label: "LineDraw5984",
    equation: "X93387837Y-116049343D01"
  },
  {
    label: "LineDraw5985",
    equation: "X93413600Y-116046998D01"
  },
  {
    label: "LineDraw5986",
    equation: "X93420302Y-116044820D01"
  },
  {
    label: "LineDraw5987",
    equation: "X93420304Y-116044820D01"
  },
  {
    label: "LineDraw5988",
    equation: "X93579409Y-115993124D01"
  },
  {
    label: "LineDraw5989",
    equation: "X93579412Y-115993123D01"
  },
  {
    label: "LineDraw5990",
    equation: "X93586108Y-115990947D01"
  },
  {
    label: "LineDraw5991",
    equation: "X93604420Y-115980031D01"
  },
  {
    label: "LineDraw5992",
    equation: "X93700983Y-115922468D01"
  },
  {
    label: "LineDraw5993",
    equation: "X93769738Y-115904768D01"
  },
  {
    label: "LineDraw5994",
    equation: "X93837147Y-115927050D01"
  },
  {
    label: "Line5995",
    equation: "X84587842Y-115128502D02"
  },
  {
    label: "Line5996",
    equation: "G01D02"
  },
  {
    label: "LineDraw5997",
    equation: "X84608816Y-115145405D01"
  },
  {
    label: "LineDraw5998",
    equation: "X85389816Y-115926405D01"
  },
  {
    label: "LineDraw5999",
    equation: "X85423842Y-115988717D01"
  },
  {
    label: "LineDraw6000",
    equation: "X85418777Y-116059532D01"
  },
  {
    label: "LineDraw6001",
    equation: "X85376230Y-116116368D01"
  },
  {
    label: "LineDraw6002",
    equation: "X85309710Y-116141179D01"
  },
  {
    label: "LineDraw6003",
    equation: "X85300721Y-116141500D01"
  },
  {
    label: "LineDraw6004",
    equation: "X77304239Y-116141500D01"
  },
  {
    label: "LineDraw6005",
    equation: "X77236118Y-116121498D01"
  },
  {
    label: "LineDraw6006",
    equation: "X77215143Y-116104595D01"
  },
  {
    label: "LineDraw6007",
    equation: "X76588887Y-115478338D01"
  },
  {
    label: "LineDraw6008",
    equation: "X76554862Y-115416026D01"
  },
  {
    label: "LineDraw6009",
    equation: "X76552768Y-115403288D01"
  },
  {
    label: "LineDraw6010",
    equation: "X76546841Y-115350446D01"
  },
  {
    label: "LineDraw6011",
    equation: "X76559125Y-115280520D01"
  },
  {
    label: "LineDraw6012",
    equation: "X76607538Y-115228172D01"
  },
  {
    label: "LineDraw6013",
    equation: "X76637614Y-115210243D01"
  },
  {
    label: "LineDraw6014",
    equation: "X76741912Y-115148069D01"
  },
  {
    label: "LineDraw6015",
    equation: "X76747012Y-115143212D01"
  },
  {
    label: "LineDraw6016",
    equation: "X76752626Y-115138951D01"
  },
  {
    label: "LineDraw6017",
    equation: "X76753385Y-115139952D01"
  },
  {
    label: "LineDraw6018",
    equation: "X76810090Y-115110762D01"
  },
  {
    label: "LineDraw6019",
    equation: "X76833860Y-115108500D01"
  },
  {
    label: "LineDraw6020",
    equation: "X84519721Y-115108500D01"
  },
  {
    label: "LineDraw6021",
    equation: "X84587842Y-115128502D01"
  },
  {
    label: "Line6022",
    equation: "X96003527Y-152653502D02"
  },
  {
    label: "Line6023",
    equation: "G01D02"
  },
  {
    label: "LineDraw6024",
    equation: "X96024501Y-152670405D01"
  },
  {
    label: "LineDraw6025",
    equation: "X97552878Y-154198783D01"
  },
  {
    label: "LineDraw6026",
    equation: "X97586904Y-154261095D01"
  },
  {
    label: "LineDraw6027",
    equation: "X97589093Y-154274706D01"
  },
  {
    label: "LineDraw6028",
    equation: "X97606458Y-154439928D01"
  },
  {
    label: "LineDraw6029",
    equation: "X97665473Y-154621556D01"
  },
  {
    label: "LineDraw6030",
    equation: "X97760960Y-154786944D01"
  },
  {
    label: "LineDraw6031",
    equation: "X97888747Y-154928866D01"
  },
  {
    label: "LineDraw6032",
    equation: "X98043248Y-155041118D01"
  },
  {
    label: "LineDraw6033",
    equation: "X98049276Y-155043802D01"
  },
  {
    label: "LineDraw6034",
    equation: "X98049278Y-155043803D01"
  },
  {
    label: "LineDraw6035",
    equation: "X98211681Y-155116109D01"
  },
  {
    label: "LineDraw6036",
    equation: "X98217712Y-155118794D01"
  },
  {
    label: "LineDraw6037",
    equation: "X98311112Y-155138647D01"
  },
  {
    label: "LineDraw6038",
    equation: "X98398056Y-155157128D01"
  },
  {
    label: "LineDraw6039",
    equation: "X98398061Y-155157128D01"
  },
  {
    label: "LineDraw6040",
    equation: "X98404513Y-155158500D01"
  },
  {
    label: "LineDraw6041",
    equation: "X98595487Y-155158500D01"
  },
  {
    label: "LineDraw6042",
    equation: "X98601945Y-155157127D01"
  },
  {
    label: "LineDraw6043",
    equation: "X98601948Y-155157127D01"
  },
  {
    label: "LineDraw6044",
    equation: "X98624026Y-155152434D01"
  },
  {
    label: "LineDraw6045",
    equation: "X98694817Y-155157835D01"
  },
  {
    label: "LineDraw6046",
    equation: "X98751450Y-155200651D01"
  },
  {
    label: "LineDraw6047",
    equation: "X98775945Y-155267288D01"
  },
  {
    label: "LineDraw6048",
    equation: "X98760525Y-155336590D01"
  },
  {
    label: "LineDraw6049",
    equation: "X98739320Y-155364775D01"
  },
  {
    label: "LineDraw6050",
    equation: "X96749500Y-157354595D01"
  },
  {
    label: "LineDraw6051",
    equation: "X96687188Y-157388621D01"
  },
  {
    label: "LineDraw6052",
    equation: "X96660405Y-157391500D01"
  },
  {
    label: "LineDraw6053",
    equation: "X94114072Y-157391500D01"
  },
  {
    label: "LineDraw6054",
    equation: "X94102889Y-157390973D01"
  },
  {
    label: "LineDraw6055",
    equation: "X94095396Y-157389298D01"
  },
  {
    label: "LineDraw6056",
    equation: "X94087470Y-157389547D01"
  },
  {
    label: "LineDraw6057",
    equation: "X94087469Y-157389547D01"
  },
  {
    label: "LineDraw6058",
    equation: "X94027306Y-157391438D01"
  },
  {
    label: "LineDraw6059",
    equation: "X94023348Y-157391500D01"
  },
  {
    label: "LineDraw6060",
    equation: "X93995449Y-157391500D01"
  },
  {
    label: "LineDraw6061",
    equation: "X93991459Y-157392004D01"
  },
  {
    label: "LineDraw6062",
    equation: "X93979625Y-157392936D01"
  },
  {
    label: "LineDraw6063",
    equation: "X93935416Y-157394326D01"
  },
  {
    label: "LineDraw6064",
    equation: "X93927802Y-157396538D01"
  },
  {
    label: "LineDraw6065",
    equation: "X93927797Y-157396539D01"
  },
  {
    label: "LineDraw6066",
    equation: "X93915964Y-157399977D01"
  },
  {
    label: "LineDraw6067",
    equation: "X93896601Y-157403988D01"
  },
  {
    label: "LineDraw6068",
    equation: "X93876508Y-157406526D01"
  },
  {
    label: "LineDraw6069",
    equation: "X93869141Y-157409443D01"
  },
  {
    label: "LineDraw6070",
    equation: "X93869136Y-157409444D01"
  },
  {
    label: "LineDraw6071",
    equation: "X93835397Y-157422802D01"
  },
  {
    label: "LineDraw6072",
    equation: "X93824170Y-157426646D01"
  },
  {
    label: "LineDraw6073",
    equation: "X93816866Y-157428768D01"
  },
  {
    label: "LineDraw6074",
    equation: "X93781712Y-157438982D01"
  },
  {
    label: "LineDraw6075",
    equation: "X93774886Y-157443019D01"
  },
  {
    label: "LineDraw6076",
    equation: "X93764277Y-157449293D01"
  },
  {
    label: "LineDraw6077",
    equation: "X93746529Y-157457988D01"
  },
  {
    label: "LineDraw6078",
    equation: "X93727688Y-157465448D01"
  },
  {
    label: "LineDraw6079",
    equation: "X93721272Y-157470110D01"
  },
  {
    label: "LineDraw6080",
    equation: "X93721271Y-157470110D01"
  },
  {
    label: "LineDraw6081",
    equation: "X93691918Y-157491436D01"
  },
  {
    label: "LineDraw6082",
    equation: "X93681998Y-157497952D01"
  },
  {
    label: "LineDraw6083",
    equation: "X93650770Y-157516420D01"
  },
  {
    label: "LineDraw6084",
    equation: "X93650767Y-157516422D01"
  },
  {
    label: "LineDraw6085",
    equation: "X93643943Y-157520458D01"
  },
  {
    label: "LineDraw6086",
    equation: "X93629622Y-157534779D01"
  },
  {
    label: "LineDraw6087",
    equation: "X93614589Y-157547619D01"
  },
  {
    label: "LineDraw6088",
    equation: "X93598198Y-157559528D01"
  },
  {
    label: "LineDraw6089",
    equation: "X93593148Y-157565632D01"
  },
  {
    label: "LineDraw6090",
    equation: "X93593143Y-157565637D01"
  },
  {
    label: "LineDraw6091",
    equation: "X93570012Y-157593598D01"
  },
  {
    label: "LineDraw6092",
    equation: "X93562022Y-157602379D01"
  },
  {
    label: "LineDraw6093",
    equation: "X92793804Y-158370596D01"
  },
  {
    label: "LineDraw6094",
    equation: "X92731492Y-158404621D01"
  },
  {
    label: "LineDraw6095",
    equation: "X92704709Y-158407500D01"
  },
  {
    label: "LineDraw6096",
    equation: "X75395594Y-158407500D01"
  },
  {
    label: "LineDraw6097",
    equation: "X75327473Y-158387498D01"
  },
  {
    label: "LineDraw6098",
    equation: "X75306499Y-158370595D01"
  },
  {
    label: "LineDraw6099",
    equation: "X73931218Y-156995313D01"
  },
  {
    label: "LineDraw6100",
    equation: "X73897192Y-156933001D01"
  },
  {
    label: "LineDraw6101",
    equation: "X73899755Y-156869589D01"
  },
  {
    label: "LineDraw6102",
    equation: "X73910865Y-156833022D01"
  },
  {
    label: "LineDraw6103",
    equation: "X73912370Y-156828069D01"
  },
  {
    label: "LineDraw6104",
    equation: "X73941529Y-156606590D01"
  },
  {
    label: "LineDraw6105",
    equation: "X73943156Y-156540000D01"
  },
  {
    label: "LineDraw6106",
    equation: "X73924852Y-156317361D01"
  },
  {
    label: "LineDraw6107",
    equation: "X73870431Y-156100702D01"
  },
  {
    label: "LineDraw6108",
    equation: "X73781354Y-155895840D01"
  },
  {
    label: "LineDraw6109",
    equation: "X73735263Y-155824594D01"
  },
  {
    label: "LineDraw6110",
    equation: "X73662822Y-155712617D01"
  },
  {
    label: "LineDraw6111",
    equation: "X73662820Y-155712614D01"
  },
  {
    label: "LineDraw6112",
    equation: "X73660014Y-155708277D01"
  },
  {
    label: "LineDraw6113",
    equation: "X73509670Y-155543051D01"
  },
  {
    label: "LineDraw6114",
    equation: "X73505619Y-155539852D01"
  },
  {
    label: "LineDraw6115",
    equation: "X73505615Y-155539848D01"
  },
  {
    label: "LineDraw6116",
    equation: "X73338414Y-155407800D01"
  },
  {
    label: "LineDraw6117",
    equation: "X73338410Y-155407798D01"
  },
  {
    label: "LineDraw6118",
    equation: "X73334359Y-155404598D01"
  },
  {
    label: "LineDraw6119",
    equation: "X73293053Y-155381796D01"
  },
  {
    label: "LineDraw6120",
    equation: "X73243084Y-155331364D01"
  },
  {
    label: "LineDraw6121",
    equation: "X73228312Y-155261921D01"
  },
  {
    label: "LineDraw6122",
    equation: "X73253428Y-155195516D01"
  },
  {
    label: "LineDraw6123",
    equation: "X73280780Y-155168909D01"
  },
  {
    label: "LineDraw6124",
    equation: "X73349115Y-155120166D01"
  },
  {
    label: "LineDraw6125",
    equation: "X73459860Y-155041173D01"
  },
  {
    label: "LineDraw6126",
    equation: "X73618096Y-154883489D01"
  },
  {
    label: "LineDraw6127",
    equation: "X73683944Y-154791852D01"
  },
  {
    label: "LineDraw6128",
    equation: "X73748453Y-154702077D01"
  },
  {
    label: "LineDraw6129",
    equation: "X73749776Y-154703028D01"
  },
  {
    label: "LineDraw6130",
    equation: "X73796645Y-154659857D01"
  },
  {
    label: "LineDraw6131",
    equation: "X73866580Y-154647625D01"
  },
  {
    label: "LineDraw6132",
    equation: "X73932026Y-154675144D01"
  },
  {
    label: "LineDraw6133",
    equation: "X73959875Y-154706994D01"
  },
  {
    label: "LineDraw6134",
    equation: "X74019987Y-154805088D01"
  },
  {
    label: "LineDraw6135",
    equation: "X74166250Y-154973938D01"
  },
  {
    label: "LineDraw6136",
    equation: "X74338126Y-155116632D01"
  },
  {
    label: "LineDraw6137",
    equation: "X74531000Y-155229338D01"
  },
  {
    label: "LineDraw6138",
    equation: "X74739692Y-155309030D01"
  },
  {
    label: "LineDraw6139",
    equation: "X74744760Y-155310061D01"
  },
  {
    label: "LineDraw6140",
    equation: "X74744763Y-155310062D01"
  },
  {
    label: "LineDraw6141",
    equation: "X74849466Y-155331364D01"
  },
  {
    label: "LineDraw6142",
    equation: "X74958597Y-155353567D01"
  },
  {
    label: "LineDraw6143",
    equation: "X74963772Y-155353757D01"
  },
  {
    label: "LineDraw6144",
    equation: "X74963774Y-155353757D01"
  },
  {
    label: "LineDraw6145",
    equation: "X75176673Y-155361564D01"
  },
  {
    label: "LineDraw6146",
    equation: "X75176677Y-155361564D01"
  },
  {
    label: "LineDraw6147",
    equation: "X75181837Y-155361753D01"
  },
  {
    label: "LineDraw6148",
    equation: "X75186957Y-155361097D01"
  },
  {
    label: "LineDraw6149",
    equation: "X75186959Y-155361097D01"
  },
  {
    label: "LineDraw6150",
    equation: "X75398288Y-155334025D01"
  },
  {
    label: "LineDraw6151",
    equation: "X75398289Y-155334025D01"
  },
  {
    label: "LineDraw6152",
    equation: "X75403416Y-155333368D01"
  },
  {
    label: "LineDraw6153",
    equation: "X75410096Y-155331364D01"
  },
  {
    label: "LineDraw6154",
    equation: "X75612429Y-155270661D01"
  },
  {
    label: "LineDraw6155",
    equation: "X75612434Y-155270659D01"
  },
  {
    label: "LineDraw6156",
    equation: "X75617384Y-155269174D01"
  },
  {
    label: "LineDraw6157",
    equation: "X75817994Y-155170896D01"
  },
  {
    label: "LineDraw6158",
    equation: "X75999860Y-155041173D01"
  },
  {
    label: "LineDraw6159",
    equation: "X76158096Y-154883489D01"
  },
  {
    label: "LineDraw6160",
    equation: "X76223944Y-154791852D01"
  },
  {
    label: "LineDraw6161",
    equation: "X76288453Y-154702077D01"
  },
  {
    label: "LineDraw6162",
    equation: "X76289776Y-154703028D01"
  },
  {
    label: "LineDraw6163",
    equation: "X76336645Y-154659857D01"
  },
  {
    label: "LineDraw6164",
    equation: "X76406580Y-154647625D01"
  },
  {
    label: "LineDraw6165",
    equation: "X76472026Y-154675144D01"
  },
  {
    label: "LineDraw6166",
    equation: "X76499875Y-154706994D01"
  },
  {
    label: "LineDraw6167",
    equation: "X76559987Y-154805088D01"
  },
  {
    label: "LineDraw6168",
    equation: "X76706250Y-154973938D01"
  },
  {
    label: "LineDraw6169",
    equation: "X76878126Y-155116632D01"
  },
  {
    label: "LineDraw6170",
    equation: "X76884174Y-155120166D01"
  },
  {
    label: "LineDraw6171",
    equation: "X76951445Y-155159476D01"
  },
  {
    label: "LineDraw6172",
    equation: "X77000169Y-155211114D01"
  },
  {
    label: "LineDraw6173",
    equation: "X77013240Y-155280897D01"
  },
  {
    label: "LineDraw6174",
    equation: "X76986509Y-155346669D01"
  },
  {
    label: "LineDraw6175",
    equation: "X76946055Y-155380027D01"
  },
  {
    label: "LineDraw6176",
    equation: "X76933607Y-155386507D01"
  },
  {
    label: "LineDraw6177",
    equation: "X76929474Y-155389610D01"
  },
  {
    label: "LineDraw6178",
    equation: "X76929471Y-155389612D01"
  },
  {
    label: "LineDraw6179",
    equation: "X76805567Y-155482642D01"
  },
  {
    label: "LineDraw6180",
    equation: "X76754965Y-155520635D01"
  },
  {
    label: "LineDraw6181",
    equation: "X76600629Y-155682138D01"
  },
  {
    label: "LineDraw6182",
    equation: "X76474743Y-155866680D01"
  },
  {
    label: "LineDraw6183",
    equation: "X76380688Y-156069305D01"
  },
  {
    label: "LineDraw6184",
    equation: "X76320989Y-156284570D01"
  },
  {
    label: "LineDraw6185",
    equation: "X76297251Y-156506695D01"
  },
  {
    label: "LineDraw6186",
    equation: "X76297548Y-156511848D01"
  },
  {
    label: "LineDraw6187",
    equation: "X76297548Y-156511851D01"
  },
  {
    label: "LineDraw6188",
    equation: "X76307816Y-156689928D01"
  },
  {
    label: "LineDraw6189",
    equation: "X76310110Y-156729715D01"
  },
  {
    label: "LineDraw6190",
    equation: "X76311247Y-156734761D01"
  },
  {
    label: "LineDraw6191",
    equation: "X76311248Y-156734767D01"
  },
  {
    label: "LineDraw6192",
    equation: "X76314681Y-156750000D01"
  },
  {
    label: "LineDraw6193",
    equation: "X76359222Y-156947639D01"
  },
  {
    label: "LineDraw6194",
    equation: "X76409878Y-157072390D01"
  },
  {
    label: "LineDraw6195",
    equation: "X76435322Y-157135051D01"
  },
  {
    label: "LineDraw6196",
    equation: "X76443266Y-157154616D01"
  },
  {
    label: "LineDraw6197",
    equation: "X76494019Y-157237438D01"
  },
  {
    label: "LineDraw6198",
    equation: "X76557291Y-157340688D01"
  },
  {
    label: "LineDraw6199",
    equation: "X76559987Y-157345088D01"
  },
  {
    label: "LineDraw6200",
    equation: "X76706250Y-157513938D01"
  },
  {
    label: "LineDraw6201",
    equation: "X76878126Y-157656632D01"
  },
  {
    label: "LineDraw6202",
    equation: "X77071000Y-157769338D01"
  },
  {
    label: "LineDraw6203",
    equation: "X77279692Y-157849030D01"
  },
  {
    label: "LineDraw6204",
    equation: "X77284760Y-157850061D01"
  },
  {
    label: "LineDraw6205",
    equation: "X77284763Y-157850062D01"
  },
  {
    label: "LineDraw6206",
    equation: "X77392012Y-157871882D01"
  },
  {
    label: "LineDraw6207",
    equation: "X77498597Y-157893567D01"
  },
  {
    label: "LineDraw6208",
    equation: "X77503772Y-157893757D01"
  },
  {
    label: "LineDraw6209",
    equation: "X77503774Y-157893757D01"
  },
  {
    label: "LineDraw6210",
    equation: "X77716673Y-157901564D01"
  },
  {
    label: "LineDraw6211",
    equation: "X77716677Y-157901564D01"
  },
  {
    label: "LineDraw6212",
    equation: "X77721837Y-157901753D01"
  },
  {
    label: "LineDraw6213",
    equation: "X77726957Y-157901097D01"
  },
  {
    label: "LineDraw6214",
    equation: "X77726959Y-157901097D01"
  },
  {
    label: "LineDraw6215",
    equation: "X77938288Y-157874025D01"
  },
  {
    label: "LineDraw6216",
    equation: "X77938289Y-157874025D01"
  },
  {
    label: "LineDraw6217",
    equation: "X77943416Y-157873368D01"
  },
  {
    label: "LineDraw6218",
    equation: "X77989827Y-157859444D01"
  },
  {
    label: "LineDraw6219",
    equation: "X78152429Y-157810661D01"
  },
  {
    label: "LineDraw6220",
    equation: "X78152434Y-157810659D01"
  },
  {
    label: "LineDraw6221",
    equation: "X78157384Y-157809174D01"
  },
  {
    label: "LineDraw6222",
    equation: "X78357994Y-157710896D01"
  },
  {
    label: "LineDraw6223",
    equation: "X78539860Y-157581173D01"
  },
  {
    label: "LineDraw6224",
    equation: "X78555451Y-157565637D01"
  },
  {
    label: "LineDraw6225",
    equation: "X78672202Y-157449293D01"
  },
  {
    label: "LineDraw6226",
    equation: "X78698096Y-157423489D01"
  },
  {
    label: "LineDraw6227",
    equation: "X78717462Y-157396539D01"
  },
  {
    label: "LineDraw6228",
    equation: "X78828453Y-157242077D01"
  },
  {
    label: "LineDraw6229",
    equation: "X78829776Y-157243028D01"
  },
  {
    label: "LineDraw6230",
    equation: "X78876645Y-157199857D01"
  },
  {
    label: "LineDraw6231",
    equation: "X78946580Y-157187625D01"
  },
  {
    label: "LineDraw6232",
    equation: "X79012026Y-157215144D01"
  },
  {
    label: "LineDraw6233",
    equation: "X79039875Y-157246994D01"
  },
  {
    label: "LineDraw6234",
    equation: "X79099987Y-157345088D01"
  },
  {
    label: "LineDraw6235",
    equation: "X79246250Y-157513938D01"
  },
  {
    label: "LineDraw6236",
    equation: "X79418126Y-157656632D01"
  },
  {
    label: "LineDraw6237",
    equation: "X79611000Y-157769338D01"
  },
  {
    label: "LineDraw6238",
    equation: "X79819692Y-157849030D01"
  },
  {
    label: "LineDraw6239",
    equation: "X79824760Y-157850061D01"
  },
  {
    label: "LineDraw6240",
    equation: "X79824763Y-157850062D01"
  },
  {
    label: "LineDraw6241",
    equation: "X79932012Y-157871882D01"
  },
  {
    label: "LineDraw6242",
    equation: "X80038597Y-157893567D01"
  },
  {
    label: "LineDraw6243",
    equation: "X80043772Y-157893757D01"
  },
  {
    label: "LineDraw6244",
    equation: "X80043774Y-157893757D01"
  },
  {
    label: "LineDraw6245",
    equation: "X80256673Y-157901564D01"
  },
  {
    label: "LineDraw6246",
    equation: "X80256677Y-157901564D01"
  },
  {
    label: "LineDraw6247",
    equation: "X80261837Y-157901753D01"
  },
  {
    label: "LineDraw6248",
    equation: "X80266957Y-157901097D01"
  },
  {
    label: "LineDraw6249",
    equation: "X80266959Y-157901097D01"
  },
  {
    label: "LineDraw6250",
    equation: "X80478288Y-157874025D01"
  },
  {
    label: "LineDraw6251",
    equation: "X80478289Y-157874025D01"
  },
  {
    label: "LineDraw6252",
    equation: "X80483416Y-157873368D01"
  },
  {
    label: "LineDraw6253",
    equation: "X80529827Y-157859444D01"
  },
  {
    label: "LineDraw6254",
    equation: "X80692429Y-157810661D01"
  },
  {
    label: "LineDraw6255",
    equation: "X80692434Y-157810659D01"
  },
  {
    label: "LineDraw6256",
    equation: "X80697384Y-157809174D01"
  },
  {
    label: "LineDraw6257",
    equation: "X80897994Y-157710896D01"
  },
  {
    label: "LineDraw6258",
    equation: "X81079860Y-157581173D01"
  },
  {
    label: "LineDraw6259",
    equation: "X81095451Y-157565637D01"
  },
  {
    label: "LineDraw6260",
    equation: "X81212202Y-157449293D01"
  },
  {
    label: "LineDraw6261",
    equation: "X81238096Y-157423489D01"
  },
  {
    label: "LineDraw6262",
    equation: "X81257462Y-157396539D01"
  },
  {
    label: "LineDraw6263",
    equation: "X81368453Y-157242077D01"
  },
  {
    label: "LineDraw6264",
    equation: "X81369776Y-157243028D01"
  },
  {
    label: "LineDraw6265",
    equation: "X81416645Y-157199857D01"
  },
  {
    label: "LineDraw6266",
    equation: "X81486580Y-157187625D01"
  },
  {
    label: "LineDraw6267",
    equation: "X81552026Y-157215144D01"
  },
  {
    label: "LineDraw6268",
    equation: "X81579875Y-157246994D01"
  },
  {
    label: "LineDraw6269",
    equation: "X81639987Y-157345088D01"
  },
  {
    label: "LineDraw6270",
    equation: "X81786250Y-157513938D01"
  },
  {
    label: "LineDraw6271",
    equation: "X81958126Y-157656632D01"
  },
  {
    label: "LineDraw6272",
    equation: "X82151000Y-157769338D01"
  },
  {
    label: "LineDraw6273",
    equation: "X82359692Y-157849030D01"
  },
  {
    label: "LineDraw6274",
    equation: "X82364760Y-157850061D01"
  },
  {
    label: "LineDraw6275",
    equation: "X82364763Y-157850062D01"
  },
  {
    label: "LineDraw6276",
    equation: "X82472012Y-157871882D01"
  },
  {
    label: "LineDraw6277",
    equation: "X82578597Y-157893567D01"
  },
  {
    label: "LineDraw6278",
    equation: "X82583772Y-157893757D01"
  },
  {
    label: "LineDraw6279",
    equation: "X82583774Y-157893757D01"
  },
  {
    label: "LineDraw6280",
    equation: "X82796673Y-157901564D01"
  },
  {
    label: "LineDraw6281",
    equation: "X82796677Y-157901564D01"
  },
  {
    label: "LineDraw6282",
    equation: "X82801837Y-157901753D01"
  },
  {
    label: "LineDraw6283",
    equation: "X82806957Y-157901097D01"
  },
  {
    label: "LineDraw6284",
    equation: "X82806959Y-157901097D01"
  },
  {
    label: "LineDraw6285",
    equation: "X83018288Y-157874025D01"
  },
  {
    label: "LineDraw6286",
    equation: "X83018289Y-157874025D01"
  },
  {
    label: "LineDraw6287",
    equation: "X83023416Y-157873368D01"
  },
  {
    label: "LineDraw6288",
    equation: "X83069827Y-157859444D01"
  },
  {
    label: "LineDraw6289",
    equation: "X83232429Y-157810661D01"
  },
  {
    label: "LineDraw6290",
    equation: "X83232434Y-157810659D01"
  },
  {
    label: "LineDraw6291",
    equation: "X83237384Y-157809174D01"
  },
  {
    label: "LineDraw6292",
    equation: "X83437994Y-157710896D01"
  },
  {
    label: "LineDraw6293",
    equation: "X83619860Y-157581173D01"
  },
  {
    label: "LineDraw6294",
    equation: "X83635451Y-157565637D01"
  },
  {
    label: "LineDraw6295",
    equation: "X83752202Y-157449293D01"
  },
  {
    label: "LineDraw6296",
    equation: "X83778096Y-157423489D01"
  },
  {
    label: "LineDraw6297",
    equation: "X83797462Y-157396539D01"
  },
  {
    label: "LineDraw6298",
    equation: "X83908453Y-157242077D01"
  },
  {
    label: "LineDraw6299",
    equation: "X83909776Y-157243028D01"
  },
  {
    label: "LineDraw6300",
    equation: "X83956645Y-157199857D01"
  },
  {
    label: "LineDraw6301",
    equation: "X84026580Y-157187625D01"
  },
  {
    label: "LineDraw6302",
    equation: "X84092026Y-157215144D01"
  },
  {
    label: "LineDraw6303",
    equation: "X84119875Y-157246994D01"
  },
  {
    label: "LineDraw6304",
    equation: "X84179987Y-157345088D01"
  },
  {
    label: "LineDraw6305",
    equation: "X84326250Y-157513938D01"
  },
  {
    label: "LineDraw6306",
    equation: "X84498126Y-157656632D01"
  },
  {
    label: "LineDraw6307",
    equation: "X84691000Y-157769338D01"
  },
  {
    label: "LineDraw6308",
    equation: "X84899692Y-157849030D01"
  },
  {
    label: "LineDraw6309",
    equation: "X84904760Y-157850061D01"
  },
  {
    label: "LineDraw6310",
    equation: "X84904763Y-157850062D01"
  },
  {
    label: "LineDraw6311",
    equation: "X85012012Y-157871882D01"
  },
  {
    label: "LineDraw6312",
    equation: "X85118597Y-157893567D01"
  },
  {
    label: "LineDraw6313",
    equation: "X85123772Y-157893757D01"
  },
  {
    label: "LineDraw6314",
    equation: "X85123774Y-157893757D01"
  },
  {
    label: "LineDraw6315",
    equation: "X85336673Y-157901564D01"
  },
  {
    label: "LineDraw6316",
    equation: "X85336677Y-157901564D01"
  },
  {
    label: "LineDraw6317",
    equation: "X85341837Y-157901753D01"
  },
  {
    label: "LineDraw6318",
    equation: "X85346957Y-157901097D01"
  },
  {
    label: "LineDraw6319",
    equation: "X85346959Y-157901097D01"
  },
  {
    label: "LineDraw6320",
    equation: "X85558288Y-157874025D01"
  },
  {
    label: "LineDraw6321",
    equation: "X85558289Y-157874025D01"
  },
  {
    label: "LineDraw6322",
    equation: "X85563416Y-157873368D01"
  },
  {
    label: "LineDraw6323",
    equation: "X85609827Y-157859444D01"
  },
  {
    label: "LineDraw6324",
    equation: "X85772429Y-157810661D01"
  },
  {
    label: "LineDraw6325",
    equation: "X85772434Y-157810659D01"
  },
  {
    label: "LineDraw6326",
    equation: "X85777384Y-157809174D01"
  },
  {
    label: "LineDraw6327",
    equation: "X85977994Y-157710896D01"
  },
  {
    label: "LineDraw6328",
    equation: "X86159860Y-157581173D01"
  },
  {
    label: "LineDraw6329",
    equation: "X86175451Y-157565637D01"
  },
  {
    label: "LineDraw6330",
    equation: "X86292202Y-157449293D01"
  },
  {
    label: "LineDraw6331",
    equation: "X86318096Y-157423489D01"
  },
  {
    label: "LineDraw6332",
    equation: "X86337462Y-157396539D01"
  },
  {
    label: "LineDraw6333",
    equation: "X86448453Y-157242077D01"
  },
  {
    label: "LineDraw6334",
    equation: "X86449776Y-157243028D01"
  },
  {
    label: "LineDraw6335",
    equation: "X86496645Y-157199857D01"
  },
  {
    label: "LineDraw6336",
    equation: "X86566580Y-157187625D01"
  },
  {
    label: "LineDraw6337",
    equation: "X86632026Y-157215144D01"
  },
  {
    label: "LineDraw6338",
    equation: "X86659875Y-157246994D01"
  },
  {
    label: "LineDraw6339",
    equation: "X86719987Y-157345088D01"
  },
  {
    label: "LineDraw6340",
    equation: "X86866250Y-157513938D01"
  },
  {
    label: "LineDraw6341",
    equation: "X87038126Y-157656632D01"
  },
  {
    label: "LineDraw6342",
    equation: "X87231000Y-157769338D01"
  },
  {
    label: "LineDraw6343",
    equation: "X87439692Y-157849030D01"
  },
  {
    label: "LineDraw6344",
    equation: "X87444760Y-157850061D01"
  },
  {
    label: "LineDraw6345",
    equation: "X87444763Y-157850062D01"
  },
  {
    label: "LineDraw6346",
    equation: "X87552012Y-157871882D01"
  },
  {
    label: "LineDraw6347",
    equation: "X87658597Y-157893567D01"
  },
  {
    label: "LineDraw6348",
    equation: "X87663772Y-157893757D01"
  },
  {
    label: "LineDraw6349",
    equation: "X87663774Y-157893757D01"
  },
  {
    label: "LineDraw6350",
    equation: "X87876673Y-157901564D01"
  },
  {
    label: "LineDraw6351",
    equation: "X87876677Y-157901564D01"
  },
  {
    label: "LineDraw6352",
    equation: "X87881837Y-157901753D01"
  },
  {
    label: "LineDraw6353",
    equation: "X87886957Y-157901097D01"
  },
  {
    label: "LineDraw6354",
    equation: "X87886959Y-157901097D01"
  },
  {
    label: "LineDraw6355",
    equation: "X88098288Y-157874025D01"
  },
  {
    label: "LineDraw6356",
    equation: "X88098289Y-157874025D01"
  },
  {
    label: "LineDraw6357",
    equation: "X88103416Y-157873368D01"
  },
  {
    label: "LineDraw6358",
    equation: "X88149827Y-157859444D01"
  },
  {
    label: "LineDraw6359",
    equation: "X88312429Y-157810661D01"
  },
  {
    label: "LineDraw6360",
    equation: "X88312434Y-157810659D01"
  },
  {
    label: "LineDraw6361",
    equation: "X88317384Y-157809174D01"
  },
  {
    label: "LineDraw6362",
    equation: "X88517994Y-157710896D01"
  },
  {
    label: "LineDraw6363",
    equation: "X88699860Y-157581173D01"
  },
  {
    label: "LineDraw6364",
    equation: "X88715451Y-157565637D01"
  },
  {
    label: "LineDraw6365",
    equation: "X88832202Y-157449293D01"
  },
  {
    label: "LineDraw6366",
    equation: "X88858096Y-157423489D01"
  },
  {
    label: "LineDraw6367",
    equation: "X88877462Y-157396539D01"
  },
  {
    label: "LineDraw6368",
    equation: "X88988453Y-157242077D01"
  },
  {
    label: "LineDraw6369",
    equation: "X88989776Y-157243028D01"
  },
  {
    label: "LineDraw6370",
    equation: "X89036645Y-157199857D01"
  },
  {
    label: "LineDraw6371",
    equation: "X89106580Y-157187625D01"
  },
  {
    label: "LineDraw6372",
    equation: "X89172026Y-157215144D01"
  },
  {
    label: "LineDraw6373",
    equation: "X89199875Y-157246994D01"
  },
  {
    label: "LineDraw6374",
    equation: "X89259987Y-157345088D01"
  },
  {
    label: "LineDraw6375",
    equation: "X89406250Y-157513938D01"
  },
  {
    label: "LineDraw6376",
    equation: "X89578126Y-157656632D01"
  },
  {
    label: "LineDraw6377",
    equation: "X89771000Y-157769338D01"
  },
  {
    label: "LineDraw6378",
    equation: "X89979692Y-157849030D01"
  },
  {
    label: "LineDraw6379",
    equation: "X89984760Y-157850061D01"
  },
  {
    label: "LineDraw6380",
    equation: "X89984763Y-157850062D01"
  },
  {
    label: "LineDraw6381",
    equation: "X90092012Y-157871882D01"
  },
  {
    label: "LineDraw6382",
    equation: "X90198597Y-157893567D01"
  },
  {
    label: "LineDraw6383",
    equation: "X90203772Y-157893757D01"
  },
  {
    label: "LineDraw6384",
    equation: "X90203774Y-157893757D01"
  },
  {
    label: "LineDraw6385",
    equation: "X90416673Y-157901564D01"
  },
  {
    label: "LineDraw6386",
    equation: "X90416677Y-157901564D01"
  },
  {
    label: "LineDraw6387",
    equation: "X90421837Y-157901753D01"
  },
  {
    label: "LineDraw6388",
    equation: "X90426957Y-157901097D01"
  },
  {
    label: "LineDraw6389",
    equation: "X90426959Y-157901097D01"
  },
  {
    label: "LineDraw6390",
    equation: "X90638288Y-157874025D01"
  },
  {
    label: "LineDraw6391",
    equation: "X90638289Y-157874025D01"
  },
  {
    label: "LineDraw6392",
    equation: "X90643416Y-157873368D01"
  },
  {
    label: "LineDraw6393",
    equation: "X90689827Y-157859444D01"
  },
  {
    label: "LineDraw6394",
    equation: "X90852429Y-157810661D01"
  },
  {
    label: "LineDraw6395",
    equation: "X90852434Y-157810659D01"
  },
  {
    label: "LineDraw6396",
    equation: "X90857384Y-157809174D01"
  },
  {
    label: "LineDraw6397",
    equation: "X91057994Y-157710896D01"
  },
  {
    label: "LineDraw6398",
    equation: "X91239860Y-157581173D01"
  },
  {
    label: "LineDraw6399",
    equation: "X91255451Y-157565637D01"
  },
  {
    label: "LineDraw6400",
    equation: "X91372202Y-157449293D01"
  },
  {
    label: "LineDraw6401",
    equation: "X91398096Y-157423489D01"
  },
  {
    label: "LineDraw6402",
    equation: "X91417462Y-157396539D01"
  },
  {
    label: "LineDraw6403",
    equation: "X91525435Y-157246277D01"
  },
  {
    label: "LineDraw6404",
    equation: "X91528453Y-157242077D01"
  },
  {
    label: "LineDraw6405",
    equation: "X91549320Y-157199857D01"
  },
  {
    label: "LineDraw6406",
    equation: "X91625136Y-157046453D01"
  },
  {
    label: "LineDraw6407",
    equation: "X91625137Y-157046451D01"
  },
  {
    label: "LineDraw6408",
    equation: "X91627430Y-157041811D01"
  },
  {
    label: "LineDraw6409",
    equation: "X91692370Y-156828069D01"
  },
  {
    label: "LineDraw6410",
    equation: "X91721529Y-156606590D01"
  },
  {
    label: "LineDraw6411",
    equation: "X91723156Y-156540000D01"
  },
  {
    label: "LineDraw6412",
    equation: "X91704852Y-156317361D01"
  },
  {
    label: "LineDraw6413",
    equation: "X91650431Y-156100702D01"
  },
  {
    label: "LineDraw6414",
    equation: "X91561354Y-155895840D01"
  },
  {
    label: "LineDraw6415",
    equation: "X91515263Y-155824594D01"
  },
  {
    label: "LineDraw6416",
    equation: "X91442822Y-155712617D01"
  },
  {
    label: "LineDraw6417",
    equation: "X91442820Y-155712614D01"
  },
  {
    label: "LineDraw6418",
    equation: "X91440014Y-155708277D01"
  },
  {
    label: "LineDraw6419",
    equation: "X91289670Y-155543051D01"
  },
  {
    label: "LineDraw6420",
    equation: "X91285619Y-155539852D01"
  },
  {
    label: "LineDraw6421",
    equation: "X91285615Y-155539848D01"
  },
  {
    label: "LineDraw6422",
    equation: "X91118414Y-155407800D01"
  },
  {
    label: "LineDraw6423",
    equation: "X91118410Y-155407798D01"
  },
  {
    label: "LineDraw6424",
    equation: "X91114359Y-155404598D01"
  },
  {
    label: "LineDraw6425",
    equation: "X91073053Y-155381796D01"
  },
  {
    label: "LineDraw6426",
    equation: "X91023084Y-155331364D01"
  },
  {
    label: "LineDraw6427",
    equation: "X91008312Y-155261921D01"
  },
  {
    label: "LineDraw6428",
    equation: "X91033428Y-155195516D01"
  },
  {
    label: "LineDraw6429",
    equation: "X91060780Y-155168909D01"
  },
  {
    label: "LineDraw6430",
    equation: "X91129115Y-155120166D01"
  },
  {
    label: "LineDraw6431",
    equation: "X91239860Y-155041173D01"
  },
  {
    label: "LineDraw6432",
    equation: "X91398096Y-154883489D01"
  },
  {
    label: "LineDraw6433",
    equation: "X91463944Y-154791852D01"
  },
  {
    label: "LineDraw6434",
    equation: "X91525435Y-154706277D01"
  },
  {
    label: "LineDraw6435",
    equation: "X91528453Y-154702077D01"
  },
  {
    label: "LineDraw6436",
    equation: "X91549320Y-154659857D01"
  },
  {
    label: "LineDraw6437",
    equation: "X91625136Y-154506453D01"
  },
  {
    label: "LineDraw6438",
    equation: "X91625137Y-154506451D01"
  },
  {
    label: "LineDraw6439",
    equation: "X91627430Y-154501811D01"
  },
  {
    label: "LineDraw6440",
    equation: "X91692370Y-154288069D01"
  },
  {
    label: "LineDraw6441",
    equation: "X91721529Y-154066590D01"
  },
  {
    label: "LineDraw6442",
    equation: "X91723156Y-154000000D01"
  },
  {
    label: "LineDraw6443",
    equation: "X91704852Y-153777361D01"
  },
  {
    label: "LineDraw6444",
    equation: "X91650431Y-153560702D01"
  },
  {
    label: "LineDraw6445",
    equation: "X91561354Y-153355840D01"
  },
  {
    label: "LineDraw6446",
    equation: "X91440014Y-153168277D01"
  },
  {
    label: "LineDraw6447",
    equation: "X91289670Y-153003051D01"
  },
  {
    label: "LineDraw6448",
    equation: "X91285619Y-152999852D01"
  },
  {
    label: "LineDraw6449",
    equation: "X91285615Y-152999848D01"
  },
  {
    label: "LineDraw6450",
    equation: "X91118417Y-152867803D01"
  },
  {
    label: "LineDraw6451",
    equation: "X91114359Y-152864598D01"
  },
  {
    label: "LineDraw6452",
    equation: "X91112746Y-152863708D01"
  },
  {
    label: "LineDraw6453",
    equation: "X91067698Y-152810091D01"
  },
  {
    label: "LineDraw6454",
    equation: "X91058665Y-152739672D01"
  },
  {
    label: "LineDraw6455",
    equation: "X91089138Y-152675547D01"
  },
  {
    label: "LineDraw6456",
    equation: "X91149441Y-152638078D01"
  },
  {
    label: "LineDraw6457",
    equation: "X91183095Y-152633500D01"
  },
  {
    label: "LineDraw6458",
    equation: "X95935406Y-152633500D01"
  },
  {
    label: "LineDraw6459",
    equation: "X96003527Y-152653502D01"
  }
];

