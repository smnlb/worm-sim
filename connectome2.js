/* C. Elegans Connectome ported to Javascript
/* Based on the python GoPiGo Connectome by Timothy Busbice, Gabriel Garrett, Geoffrey Churchill
/* Find it here: https://github.com/Connectome/GoPiGo
/* Pls do not remove this header - zrispo
 */

var BRAIN2 = {};

// Import the weights from the weights.js file so it works in the browser
BRAIN2.weights = weights;

// A method that accepts the preSynaptic neuron and updates the postSynaptic neurons with the weighted values
BRAIN2.dendriteAccumulate = function (preSynaptic2) {
	// Loop through the postSynaptic neurons
	for (var postSynaptic2 in BRAIN2.weights[preSynaptic2]) {
		// Update the postSynaptic neurons with the weighted values
		BRAIN2.postSynaptic2[postSynaptic2][BRAIN2.nextState2] +=
			BRAIN2.weights[preSynaptic2][postSynaptic2];
	}
};

/* Note: The way these work is sort of confusing
 * After every update, the value in nextState is copied into thisState,
 * and thisState and nextState are swapped (so after the first update, thisState = 1, and nextState = 0) */
BRAIN2.thisState2 = 0;
BRAIN2.nextState2 = 1;

/* Maximum accumulated value that must be exceeded before the Neurite will fire */
BRAIN2.fireThreshold2 = 30;

/* Accumulators are used to decide the value to send to the Left and Right motors of the GoPiGo robot */
/* Since this is the javascript version, you can use these to control whatever you want! */
BRAIN2.accumleft2 = 0;
BRAIN2.accumright2 = 0;

/* Used to remove from Axon firing since muscles cannot fire. */
BRAIN2.muscles2 = ['MVU', 'MVL', 'MDL', 'MVR', 'MDR'];

BRAIN2.muscleList2 = [
	'MDL07',
	'MDL08',
	'MDL09',
	'MDL10',
	'MDL11',
	'MDL12',
	'MDL13',
	'MDL14',
	'MDL15',
	'MDL16',
	'MDL17',
	'MDL18',
	'MDL19',
	'MDL20',
	'MDL21',
	'MDL22',
	'MDL23',
	'MVL07',
	'MVL08',
	'MVL09',
	'MVL10',
	'MVL11',
	'MVL12',
	'MVL13',
	'MVL14',
	'MVL15',
	'MVL16',
	'MVL17',
	'MVL18',
	'MVL19',
	'MVL20',
	'MVL21',
	'MVL22',
	'MVL23',
	'MDR07',
	'MDR08',
	'MDR09',
	'MDR10',
	'MDR11',
	'MDR12',
	'MDR13',
	'MDR14',
	'MDR15',
	'MDR16',
	'MDR17',
	'MDR18',
	'MDR19',
	'MDR20',
	'MDL21',
	'MDR22',
	'MDR23',
	'MVR07',
	'MVR08',
	'MVR09',
	'MVR10',
	'MVR11',
	'MVR12',
	'MVR13',
	'MVR14',
	'MVR15',
	'MVR16',
	'MVR17',
	'MVR18',
	'MVR19',
	'MVR20',
	'MVL21',
	'MVR22',
	'MVR23',
];

BRAIN2.mLeft2 = [
	'MDL07',
	'MDL08',
	'MDL09',
	'MDL10',
	'MDL11',
	'MDL12',
	'MDL13',
	'MDL14',
	'MDL15',
	'MDL16',
	'MDL17',
	'MDL18',
	'MDL19',
	'MDL20',
	'MDL21',
	'MDL22',
	'MDL23',
	'MVL07',
	'MVL08',
	'MVL09',
	'MVL10',
	'MVL11',
	'MVL12',
	'MVL13',
	'MVL14',
	'MVL15',
	'MVL16',
	'MVL17',
	'MVL18',
	'MVL19',
	'MVL20',
	'MVL21',
	'MVL22',
	'MVL23',
];
BRAIN2.mRight2 = [
	'MDR07',
	'MDR08',
	'MDR09',
	'MDR10',
	'MDR11',
	'MDR12',
	'MDR13',
	'MDR14',
	'MDR15',
	'MDR16',
	'MDR17',
	'MDR18',
	'MDR19',
	'MDR20',
	'MDL21',
	'MDR22',
	'MDR23',
	'MVR07',
	'MVR08',
	'MVR09',
	'MVR10',
	'MVR11',
	'MVR12',
	'MVR13',
	'MVR14',
	'MVR15',
	'MVR16',
	'MVR17',
	'MVR18',
	'MVR19',
	'MVR20',
	'MVL21',
	'MVR22',
	'MVR23',
];
/* Used to accumulate muscle weighted values in body muscles 07-23 = worm locomotion */
BRAIN2.musDleft2 = [
	'MDL07',
	'MDL08',
	'MDL09',
	'MDL10',
	'MDL11',
	'MDL12',
	'MDL13',
	'MDL14',
	'MDL15',
	'MDL16',
	'MDL17',
	'MDL18',
	'MDL19',
	'MDL20',
	'MDL21',
	'MDL22',
	'MDL23',
];
BRAIN2.musVleft2 = [
	'MVL07',
	'MVL08',
	'MVL09',
	'MVL10',
	'MVL11',
	'MVL12',
	'MVL13',
	'MVL14',
	'MVL15',
	'MVL16',
	'MVL17',
	'MVL18',
	'MVL19',
	'MVL20',
	'MVL21',
	'MVL22',
	'MVL23',
];
BRAIN2.musDright2 = [
	'MDR07',
	'MDR08',
	'MDR09',
	'MDR10',
	'MDR11',
	'MDR12',
	'MDR13',
	'MDR14',
	'MDR15',
	'MDR16',
	'MDR17',
	'MDR18',
	'MDR19',
	'MDR20',
	'MDL21',
	'MDR22',
	'MDR23',
];
BRAIN2.musVright2 = [
	'MVR07',
	'MVR08',
	'MVR09',
	'MVR10',
	'MVR11',
	'MVR12',
	'MVR13',
	'MVR14',
	'MVR15',
	'MVR16',
	'MVR17',
	'MVR18',
	'MVR19',
	'MVR20',
	'MVL21',
	'MVR22',
	'MVR23',
];

/* Use these to stimulate nose and food sensing neurons */
BRAIN2.stimulateHungerNeurons2 = true;
BRAIN2.stimulateNoseTouchNeurons2 = false;
BRAIN2.stimulateFoodSenseNeurons2 = false;

// we want each simualtion to be slightly different
BRAIN2.randExcite = function () {
	for (var i2 = 0; i2 < 40; i2++) {
		BRAIN2.dendriteAccumulate(
			Object.keys(BRAIN2.connectome2)[
				Math.floor(Math.random() * Object.keys(BRAIN2.connectome2).length)
			],
		);
	}
};

BRAIN2.setup = function () {
	/* The postSynaptic dictionary contains the accumulated weighted values as the
	 * connectome is executed */
	BRAIN2.postSynaptic2 = {};

	/* This is the full C Elegans Connectome as expresed in the form of the connectome
	 *  neurite and the postSynaptic neurites. */
	BRAIN2.connectome2 = {};

	// For each neuron in weights.json, add a function to the connectome that invokes dendriteAccumulate
	for (var preSynaptic2 in BRAIN2.weights) {
		BRAIN2.connectome2[preSynaptic2] = function () {
			BRAIN2.dendriteAccumulate(preSynaptic2);
		};
	}

	BRAIN2.postSynaptic2['ADAL'] = [0, 0];
	BRAIN2.postSynaptic2['ADAR'] = [0, 0];
	BRAIN2.postSynaptic2['ADEL'] = [0, 0];
	BRAIN2.postSynaptic2['ADER'] = [0, 0];
	BRAIN2.postSynaptic2['ADFL'] = [0, 0];
	BRAIN2.postSynaptic2['ADFR'] = [0, 0];
	BRAIN2.postSynaptic2['ADLL'] = [0, 0];
	BRAIN2.postSynaptic2['ADLR'] = [0, 0];
	BRAIN2.postSynaptic2['AFDL'] = [0, 0];
	BRAIN2.postSynaptic2['AFDR'] = [0, 0];
	BRAIN2.postSynaptic2['AIAL'] = [0, 0];
	BRAIN2.postSynaptic2['AIAR'] = [0, 0];
	BRAIN2.postSynaptic2['AIBL'] = [0, 0];
	BRAIN2.postSynaptic2['AIBR'] = [0, 0];
	BRAIN2.postSynaptic2['AIML'] = [0, 0];
	BRAIN2.postSynaptic2['AIMR'] = [0, 0];
	BRAIN2.postSynaptic2['AINL'] = [0, 0];
	BRAIN2.postSynaptic2['AINR'] = [0, 0];
	BRAIN2.postSynaptic2['AIYL'] = [0, 0];
	BRAIN2.postSynaptic2['AIYR'] = [0, 0];
	BRAIN2.postSynaptic2['AIZL'] = [0, 0];
	BRAIN2.postSynaptic2['AIZR'] = [0, 0];
	BRAIN2.postSynaptic2['ALA'] = [0, 0];
	BRAIN2.postSynaptic2['ALML'] = [0, 0];
	BRAIN2.postSynaptic2['ALMR'] = [0, 0];
	BRAIN2.postSynaptic2['ALNL'] = [0, 0];
	BRAIN2.postSynaptic2['ALNR'] = [0, 0];
	BRAIN2.postSynaptic2['AQR'] = [0, 0];
	BRAIN2.postSynaptic2['AS1'] = [0, 0];
	BRAIN2.postSynaptic2['AS10'] = [0, 0];
	BRAIN2.postSynaptic2['AS11'] = [0, 0];
	BRAIN2.postSynaptic2['AS2'] = [0, 0];
	BRAIN2.postSynaptic2['AS3'] = [0, 0];
	BRAIN2.postSynaptic2['AS4'] = [0, 0];
	BRAIN2.postSynaptic2['AS5'] = [0, 0];
	BRAIN2.postSynaptic2['AS6'] = [0, 0];
	BRAIN2.postSynaptic2['AS7'] = [0, 0];
	BRAIN2.postSynaptic2['AS8'] = [0, 0];
	BRAIN2.postSynaptic2['AS9'] = [0, 0];
	BRAIN2.postSynaptic2['ASEL'] = [0, 0];
	BRAIN2.postSynaptic2['ASER'] = [0, 0];
	BRAIN2.postSynaptic2['ASGL'] = [0, 0];
	BRAIN2.postSynaptic2['ASGR'] = [0, 0];
	BRAIN2.postSynaptic2['ASHL'] = [0, 0];
	BRAIN2.postSynaptic2['ASHR'] = [0, 0];
	BRAIN2.postSynaptic2['ASIL'] = [0, 0];
	BRAIN2.postSynaptic2['ASIR'] = [0, 0];
	BRAIN2.postSynaptic2['ASJL'] = [0, 0];
	BRAIN2.postSynaptic2['ASJR'] = [0, 0];
	BRAIN2.postSynaptic2['ASKL'] = [0, 0];
	BRAIN2.postSynaptic2['ASKR'] = [0, 0];
	BRAIN2.postSynaptic2['AUAL'] = [0, 0];
	BRAIN2.postSynaptic2['AUAR'] = [0, 0];
	BRAIN2.postSynaptic2['AVAL'] = [0, 0];
	BRAIN2.postSynaptic2['AVAR'] = [0, 0];
	BRAIN2.postSynaptic2['AVBL'] = [0, 0];
	BRAIN2.postSynaptic2['AVBR'] = [0, 0];
	BRAIN2.postSynaptic2['AVDL'] = [0, 0];
	BRAIN2.postSynaptic2['AVDR'] = [0, 0];
	BRAIN2.postSynaptic2['AVEL'] = [0, 0];
	BRAIN2.postSynaptic2['AVER'] = [0, 0];
	BRAIN2.postSynaptic2['AVFL'] = [0, 0];
	BRAIN2.postSynaptic2['AVFR'] = [0, 0];
	BRAIN2.postSynaptic2['AVG'] = [0, 0];
	BRAIN2.postSynaptic2['AVHL'] = [0, 0];
	BRAIN2.postSynaptic2['AVHR'] = [0, 0];
	BRAIN2.postSynaptic2['AVJL'] = [0, 0];
	BRAIN2.postSynaptic2['AVJR'] = [0, 0];
	BRAIN2.postSynaptic2['AVKL'] = [0, 0];
	BRAIN2.postSynaptic2['AVKR'] = [0, 0];
	BRAIN2.postSynaptic2['AVL'] = [0, 0];
	BRAIN2.postSynaptic2['AVM'] = [0, 0];
	BRAIN2.postSynaptic2['AWAL'] = [0, 0];
	BRAIN2.postSynaptic2['AWAR'] = [0, 0];
	BRAIN2.postSynaptic2['AWBL'] = [0, 0];
	BRAIN2.postSynaptic2['AWBR'] = [0, 0];
	BRAIN2.postSynaptic2['AWCL'] = [0, 0];
	BRAIN2.postSynaptic2['AWCR'] = [0, 0];
	BRAIN2.postSynaptic2['BAGL'] = [0, 0];
	BRAIN2.postSynaptic2['BAGR'] = [0, 0];
	BRAIN2.postSynaptic2['BDUL'] = [0, 0];
	BRAIN2.postSynaptic2['BDUR'] = [0, 0];
	BRAIN2.postSynaptic2['CEPDL'] = [0, 0];
	BRAIN2.postSynaptic2['CEPDR'] = [0, 0];
	BRAIN2.postSynaptic2['CEPVL'] = [0, 0];
	BRAIN2.postSynaptic2['CEPVR'] = [0, 0];
	BRAIN2.postSynaptic2['DA1'] = [0, 0];
	BRAIN2.postSynaptic2['DA2'] = [0, 0];
	BRAIN2.postSynaptic2['DA3'] = [0, 0];
	BRAIN2.postSynaptic2['DA4'] = [0, 0];
	BRAIN2.postSynaptic2['DA5'] = [0, 0];
	BRAIN2.postSynaptic2['DA6'] = [0, 0];
	BRAIN2.postSynaptic2['DA7'] = [0, 0];
	BRAIN2.postSynaptic2['DA8'] = [0, 0];
	BRAIN2.postSynaptic2['DA9'] = [0, 0];
	BRAIN2.postSynaptic2['DB1'] = [0, 0];
	BRAIN2.postSynaptic2['DB2'] = [0, 0];
	BRAIN2.postSynaptic2['DB3'] = [0, 0];
	BRAIN2.postSynaptic2['DB4'] = [0, 0];
	BRAIN2.postSynaptic2['DB5'] = [0, 0];
	BRAIN2.postSynaptic2['DB6'] = [0, 0];
	BRAIN2.postSynaptic2['DB7'] = [0, 0];
	BRAIN2.postSynaptic2['DD1'] = [0, 0];
	BRAIN2.postSynaptic2['DD2'] = [0, 0];
	BRAIN2.postSynaptic2['DD3'] = [0, 0];
	BRAIN2.postSynaptic2['DD4'] = [0, 0];
	BRAIN2.postSynaptic2['DD5'] = [0, 0];
	BRAIN2.postSynaptic2['DD6'] = [0, 0];
	BRAIN2.postSynaptic2['DVA'] = [0, 0];
	BRAIN2.postSynaptic2['DVB'] = [0, 0];
	BRAIN2.postSynaptic2['DVC'] = [0, 0];
	BRAIN2.postSynaptic2['FLPL'] = [0, 0];
	BRAIN2.postSynaptic2['FLPR'] = [0, 0];
	BRAIN2.postSynaptic2['HSNL'] = [0, 0];
	BRAIN2.postSynaptic2['HSNR'] = [0, 0];
	BRAIN2.postSynaptic2['I1L'] = [0, 0];
	BRAIN2.postSynaptic2['I1R'] = [0, 0];
	BRAIN2.postSynaptic2['I2L'] = [0, 0];
	BRAIN2.postSynaptic2['I2R'] = [0, 0];
	BRAIN2.postSynaptic2['I3'] = [0, 0];
	BRAIN2.postSynaptic2['I4'] = [0, 0];
	BRAIN2.postSynaptic2['I5'] = [0, 0];
	BRAIN2.postSynaptic2['I6'] = [0, 0];
	BRAIN2.postSynaptic2['IL1DL'] = [0, 0];
	BRAIN2.postSynaptic2['IL1DR'] = [0, 0];
	BRAIN2.postSynaptic2['IL1L'] = [0, 0];
	BRAIN2.postSynaptic2['IL1R'] = [0, 0];
	BRAIN2.postSynaptic2['IL1VL'] = [0, 0];
	BRAIN2.postSynaptic2['IL1VR'] = [0, 0];
	BRAIN2.postSynaptic2['IL2L'] = [0, 0];
	BRAIN2.postSynaptic2['IL2R'] = [0, 0];
	BRAIN2.postSynaptic2['IL2DL'] = [0, 0];
	BRAIN2.postSynaptic2['IL2DR'] = [0, 0];
	BRAIN2.postSynaptic2['IL2VL'] = [0, 0];
	BRAIN2.postSynaptic2['IL2VR'] = [0, 0];
	BRAIN2.postSynaptic2['LUAL'] = [0, 0];
	BRAIN2.postSynaptic2['LUAR'] = [0, 0];
	BRAIN2.postSynaptic2['M1'] = [0, 0];
	BRAIN2.postSynaptic2['M2L'] = [0, 0];
	BRAIN2.postSynaptic2['M2R'] = [0, 0];
	BRAIN2.postSynaptic2['M3L'] = [0, 0];
	BRAIN2.postSynaptic2['M3R'] = [0, 0];
	BRAIN2.postSynaptic2['M4'] = [0, 0];
	BRAIN2.postSynaptic2['M5'] = [0, 0];
	BRAIN2.postSynaptic2['MANAL'] = [0, 0];
	BRAIN2.postSynaptic2['MCL'] = [0, 0];
	BRAIN2.postSynaptic2['MCR'] = [0, 0];
	BRAIN2.postSynaptic2['MDL01'] = [0, 0];
	BRAIN2.postSynaptic2['MDL02'] = [0, 0];
	BRAIN2.postSynaptic2['MDL03'] = [0, 0];
	BRAIN2.postSynaptic2['MDL04'] = [0, 0];
	BRAIN2.postSynaptic2['MDL05'] = [0, 0];
	BRAIN2.postSynaptic2['MDL06'] = [0, 0];
	BRAIN2.postSynaptic2['MDL07'] = [0, 0];
	BRAIN2.postSynaptic2['MDL08'] = [0, 0];
	BRAIN2.postSynaptic2['MDL09'] = [0, 0];
	BRAIN2.postSynaptic2['MDL10'] = [0, 0];
	BRAIN2.postSynaptic2['MDL11'] = [0, 0];
	BRAIN2.postSynaptic2['MDL12'] = [0, 0];
	BRAIN2.postSynaptic2['MDL13'] = [0, 0];
	BRAIN2.postSynaptic2['MDL14'] = [0, 0];
	BRAIN2.postSynaptic2['MDL15'] = [0, 0];
	BRAIN2.postSynaptic2['MDL16'] = [0, 0];
	BRAIN2.postSynaptic2['MDL17'] = [0, 0];
	BRAIN2.postSynaptic2['MDL18'] = [0, 0];
	BRAIN2.postSynaptic2['MDL19'] = [0, 0];
	BRAIN2.postSynaptic2['MDL20'] = [0, 0];
	BRAIN2.postSynaptic2['MDL21'] = [0, 0];
	BRAIN2.postSynaptic2['MDL22'] = [0, 0];
	BRAIN2.postSynaptic2['MDL23'] = [0, 0];
	BRAIN2.postSynaptic2['MDL24'] = [0, 0];
	BRAIN2.postSynaptic2['MDR01'] = [0, 0];
	BRAIN2.postSynaptic2['MDR02'] = [0, 0];
	BRAIN2.postSynaptic2['MDR03'] = [0, 0];
	BRAIN2.postSynaptic2['MDR04'] = [0, 0];
	BRAIN2.postSynaptic2['MDR05'] = [0, 0];
	BRAIN2.postSynaptic2['MDR06'] = [0, 0];
	BRAIN2.postSynaptic2['MDR07'] = [0, 0];
	BRAIN2.postSynaptic2['MDR08'] = [0, 0];
	BRAIN2.postSynaptic2['MDR09'] = [0, 0];
	BRAIN2.postSynaptic2['MDR10'] = [0, 0];
	BRAIN2.postSynaptic2['MDR11'] = [0, 0];
	BRAIN2.postSynaptic2['MDR12'] = [0, 0];
	BRAIN2.postSynaptic2['MDR13'] = [0, 0];
	BRAIN2.postSynaptic2['MDR14'] = [0, 0];
	BRAIN2.postSynaptic2['MDR15'] = [0, 0];
	BRAIN2.postSynaptic2['MDR16'] = [0, 0];
	BRAIN2.postSynaptic2['MDR17'] = [0, 0];
	BRAIN2.postSynaptic2['MDR18'] = [0, 0];
	BRAIN2.postSynaptic2['MDR19'] = [0, 0];
	BRAIN2.postSynaptic2['MDR20'] = [0, 0];
	BRAIN2.postSynaptic2['MDR21'] = [0, 0];
	BRAIN2.postSynaptic2['MDR22'] = [0, 0];
	BRAIN2.postSynaptic2['MDR23'] = [0, 0];
	BRAIN2.postSynaptic2['MDR24'] = [0, 0];
	BRAIN2.postSynaptic2['MI'] = [0, 0];
	BRAIN2.postSynaptic2['MVL01'] = [0, 0];
	BRAIN2.postSynaptic2['MVL02'] = [0, 0];
	BRAIN2.postSynaptic2['MVL03'] = [0, 0];
	BRAIN2.postSynaptic2['MVL04'] = [0, 0];
	BRAIN2.postSynaptic2['MVL05'] = [0, 0];
	BRAIN2.postSynaptic2['MVL06'] = [0, 0];
	BRAIN2.postSynaptic2['MVL07'] = [0, 0];
	BRAIN2.postSynaptic2['MVL08'] = [0, 0];
	BRAIN2.postSynaptic2['MVL09'] = [0, 0];
	BRAIN2.postSynaptic2['MVL10'] = [0, 0];
	BRAIN2.postSynaptic2['MVL11'] = [0, 0];
	BRAIN2.postSynaptic2['MVL12'] = [0, 0];
	BRAIN2.postSynaptic2['MVL13'] = [0, 0];
	BRAIN2.postSynaptic2['MVL14'] = [0, 0];
	BRAIN2.postSynaptic2['MVL15'] = [0, 0];
	BRAIN2.postSynaptic2['MVL16'] = [0, 0];
	BRAIN2.postSynaptic2['MVL17'] = [0, 0];
	BRAIN2.postSynaptic2['MVL18'] = [0, 0];
	BRAIN2.postSynaptic2['MVL19'] = [0, 0];
	BRAIN2.postSynaptic2['MVL20'] = [0, 0];
	BRAIN2.postSynaptic2['MVL21'] = [0, 0];
	BRAIN2.postSynaptic2['MVL22'] = [0, 0];
	BRAIN2.postSynaptic2['MVL23'] = [0, 0];
	BRAIN2.postSynaptic2['MVR01'] = [0, 0];
	BRAIN2.postSynaptic2['MVR02'] = [0, 0];
	BRAIN2.postSynaptic2['MVR03'] = [0, 0];
	BRAIN2.postSynaptic2['MVR04'] = [0, 0];
	BRAIN2.postSynaptic2['MVR05'] = [0, 0];
	BRAIN2.postSynaptic2['MVR06'] = [0, 0];
	BRAIN2.postSynaptic2['MVR07'] = [0, 0];
	BRAIN2.postSynaptic2['MVR08'] = [0, 0];
	BRAIN2.postSynaptic2['MVR09'] = [0, 0];
	BRAIN2.postSynaptic2['MVR10'] = [0, 0];
	BRAIN2.postSynaptic2['MVR11'] = [0, 0];
	BRAIN2.postSynaptic2['MVR12'] = [0, 0];
	BRAIN2.postSynaptic2['MVR13'] = [0, 0];
	BRAIN2.postSynaptic2['MVR14'] = [0, 0];
	BRAIN2.postSynaptic2['MVR15'] = [0, 0];
	BRAIN2.postSynaptic2['MVR16'] = [0, 0];
	BRAIN2.postSynaptic2['MVR17'] = [0, 0];
	BRAIN2.postSynaptic2['MVR18'] = [0, 0];
	BRAIN2.postSynaptic2['MVR19'] = [0, 0];
	BRAIN2.postSynaptic2['MVR20'] = [0, 0];
	BRAIN2.postSynaptic2['MVR21'] = [0, 0];
	BRAIN2.postSynaptic2['MVR22'] = [0, 0];
	BRAIN2.postSynaptic2['MVR23'] = [0, 0];
	BRAIN2.postSynaptic2['MVR24'] = [0, 0];
	BRAIN2.postSynaptic2['MVULVA'] = [0, 0];
	BRAIN2.postSynaptic2['NSML'] = [0, 0];
	BRAIN2.postSynaptic2['NSMR'] = [0, 0];
	BRAIN2.postSynaptic2['OLLL'] = [0, 0];
	BRAIN2.postSynaptic2['OLLR'] = [0, 0];
	BRAIN2.postSynaptic2['OLQDL'] = [0, 0];
	BRAIN2.postSynaptic2['OLQDR'] = [0, 0];
	BRAIN2.postSynaptic2['OLQVL'] = [0, 0];
	BRAIN2.postSynaptic2['OLQVR'] = [0, 0];
	BRAIN2.postSynaptic2['PDA'] = [0, 0];
	BRAIN2.postSynaptic2['PDB'] = [0, 0];
	BRAIN2.postSynaptic2['PDEL'] = [0, 0];
	BRAIN2.postSynaptic2['PDER'] = [0, 0];
	BRAIN2.postSynaptic2['PHAL'] = [0, 0];
	BRAIN2.postSynaptic2['PHAR'] = [0, 0];
	BRAIN2.postSynaptic2['PHBL'] = [0, 0];
	BRAIN2.postSynaptic2['PHBR'] = [0, 0];
	BRAIN2.postSynaptic2['PHCL'] = [0, 0];
	BRAIN2.postSynaptic2['PHCR'] = [0, 0];
	BRAIN2.postSynaptic2['PLML'] = [0, 0];
	BRAIN2.postSynaptic2['PLMR'] = [0, 0];
	BRAIN2.postSynaptic2['PLNL'] = [0, 0];
	BRAIN2.postSynaptic2['PLNR'] = [0, 0];
	BRAIN2.postSynaptic2['PQR'] = [0, 0];
	BRAIN2.postSynaptic2['PVCL'] = [0, 0];
	BRAIN2.postSynaptic2['PVCR'] = [0, 0];
	BRAIN2.postSynaptic2['PVDL'] = [0, 0];
	BRAIN2.postSynaptic2['PVDR'] = [0, 0];
	BRAIN2.postSynaptic2['PVM'] = [0, 0];
	BRAIN2.postSynaptic2['PVNL'] = [0, 0];
	BRAIN2.postSynaptic2['PVNR'] = [0, 0];
	BRAIN2.postSynaptic2['PVPL'] = [0, 0];
	BRAIN2.postSynaptic2['PVPR'] = [0, 0];
	BRAIN2.postSynaptic2['PVQL'] = [0, 0];
	BRAIN2.postSynaptic2['PVQR'] = [0, 0];
	BRAIN2.postSynaptic2['PVR'] = [0, 0];
	BRAIN2.postSynaptic2['PVT'] = [0, 0];
	BRAIN2.postSynaptic2['PVWL'] = [0, 0];
	BRAIN2.postSynaptic2['PVWR'] = [0, 0];
	BRAIN2.postSynaptic2['RIAL'] = [0, 0];
	BRAIN2.postSynaptic2['RIAR'] = [0, 0];
	BRAIN2.postSynaptic2['RIBL'] = [0, 0];
	BRAIN2.postSynaptic2['RIBR'] = [0, 0];
	BRAIN2.postSynaptic2['RICL'] = [0, 0];
	BRAIN2.postSynaptic2['RICR'] = [0, 0];
	BRAIN2.postSynaptic2['RID'] = [0, 0];
	BRAIN2.postSynaptic2['RIFL'] = [0, 0];
	BRAIN2.postSynaptic2['RIFR'] = [0, 0];
	BRAIN2.postSynaptic2['RIGL'] = [0, 0];
	BRAIN2.postSynaptic2['RIGR'] = [0, 0];
	BRAIN2.postSynaptic2['RIH'] = [0, 0];
	BRAIN2.postSynaptic2['RIML'] = [0, 0];
	BRAIN2.postSynaptic2['RIMR'] = [0, 0];
	BRAIN2.postSynaptic2['RIPL'] = [0, 0];
	BRAIN2.postSynaptic2['RIPR'] = [0, 0];
	BRAIN2.postSynaptic2['RIR'] = [0, 0];
	BRAIN2.postSynaptic2['RIS'] = [0, 0];
	BRAIN2.postSynaptic2['RIVL'] = [0, 0];
	BRAIN2.postSynaptic2['RIVR'] = [0, 0];
	BRAIN2.postSynaptic2['RMDDL'] = [0, 0];
	BRAIN2.postSynaptic2['RMDDR'] = [0, 0];
	BRAIN2.postSynaptic2['RMDL'] = [0, 0];
	BRAIN2.postSynaptic2['RMDR'] = [0, 0];
	BRAIN2.postSynaptic2['RMDVL'] = [0, 0];
	BRAIN2.postSynaptic2['RMDVR'] = [0, 0];
	BRAIN2.postSynaptic2['RMED'] = [0, 0];
	BRAIN2.postSynaptic2['RMEL'] = [0, 0];
	BRAIN2.postSynaptic2['RMER'] = [0, 0];
	BRAIN2.postSynaptic2['RMEV'] = [0, 0];
	BRAIN2.postSynaptic2['RMFL'] = [0, 0];
	BRAIN2.postSynaptic2['RMFR'] = [0, 0];
	BRAIN2.postSynaptic2['RMGL'] = [0, 0];
	BRAIN2.postSynaptic2['RMGR'] = [0, 0];
	BRAIN2.postSynaptic2['RMHL'] = [0, 0];
	BRAIN2.postSynaptic2['RMHR'] = [0, 0];
	BRAIN2.postSynaptic2['SAADL'] = [0, 0];
	BRAIN2.postSynaptic2['SAADR'] = [0, 0];
	BRAIN2.postSynaptic2['SAAVL'] = [0, 0];
	BRAIN2.postSynaptic2['SAAVR'] = [0, 0];
	BRAIN2.postSynaptic2['SABD'] = [0, 0];
	BRAIN2.postSynaptic2['SABVL'] = [0, 0];
	BRAIN2.postSynaptic2['SABVR'] = [0, 0];
	BRAIN2.postSynaptic2['SDQL'] = [0, 0];
	BRAIN2.postSynaptic2['SDQR'] = [0, 0];
	BRAIN2.postSynaptic2['SIADL'] = [0, 0];
	BRAIN2.postSynaptic2['SIADR'] = [0, 0];
	BRAIN2.postSynaptic2['SIAVL'] = [0, 0];
	BRAIN2.postSynaptic2['SIAVR'] = [0, 0];
	BRAIN2.postSynaptic2['SIBDL'] = [0, 0];
	BRAIN2.postSynaptic2['SIBDR'] = [0, 0];
	BRAIN2.postSynaptic2['SIBVL'] = [0, 0];
	BRAIN2.postSynaptic2['SIBVR'] = [0, 0];
	BRAIN2.postSynaptic2['SMBDL'] = [0, 0];
	BRAIN2.postSynaptic2['SMBDR'] = [0, 0];
	BRAIN2.postSynaptic2['SMBVL'] = [0, 0];
	BRAIN2.postSynaptic2['SMBVR'] = [0, 0];
	BRAIN2.postSynaptic2['SMDDL'] = [0, 0];
	BRAIN2.postSynaptic2['SMDDR'] = [0, 0];
	BRAIN2.postSynaptic2['SMDVL'] = [0, 0];
	BRAIN2.postSynaptic2['SMDVR'] = [0, 0];
	BRAIN2.postSynaptic2['URADL'] = [0, 0];
	BRAIN2.postSynaptic2['URADR'] = [0, 0];
	BRAIN2.postSynaptic2['URAVL'] = [0, 0];
	BRAIN2.postSynaptic2['URAVR'] = [0, 0];
	BRAIN2.postSynaptic2['URBL'] = [0, 0];
	BRAIN2.postSynaptic2['URBR'] = [0, 0];
	BRAIN2.postSynaptic2['URXL'] = [0, 0];
	BRAIN2.postSynaptic2['URXR'] = [0, 0];
	BRAIN2.postSynaptic2['URYDL'] = [0, 0];
	BRAIN2.postSynaptic2['URYDR'] = [0, 0];
	BRAIN2.postSynaptic2['URYVL'] = [0, 0];
	BRAIN2.postSynaptic2['URYVR'] = [0, 0];
	BRAIN2.postSynaptic2['VA1'] = [0, 0];
	BRAIN2.postSynaptic2['VA10'] = [0, 0];
	BRAIN2.postSynaptic2['VA11'] = [0, 0];
	BRAIN2.postSynaptic2['VA12'] = [0, 0];
	BRAIN2.postSynaptic2['VA2'] = [0, 0];
	BRAIN2.postSynaptic2['VA3'] = [0, 0];
	BRAIN2.postSynaptic2['VA4'] = [0, 0];
	BRAIN2.postSynaptic2['VA5'] = [0, 0];
	BRAIN2.postSynaptic2['VA6'] = [0, 0];
	BRAIN2.postSynaptic2['VA7'] = [0, 0];
	BRAIN2.postSynaptic2['VA8'] = [0, 0];
	BRAIN2.postSynaptic2['VA9'] = [0, 0];
	BRAIN2.postSynaptic2['VB1'] = [0, 0];
	BRAIN2.postSynaptic2['VB10'] = [0, 0];
	BRAIN2.postSynaptic2['VB11'] = [0, 0];
	BRAIN2.postSynaptic2['VB2'] = [0, 0];
	BRAIN2.postSynaptic2['VB3'] = [0, 0];
	BRAIN2.postSynaptic2['VB4'] = [0, 0];
	BRAIN2.postSynaptic2['VB5'] = [0, 0];
	BRAIN2.postSynaptic2['VB6'] = [0, 0];
	BRAIN2.postSynaptic2['VB7'] = [0, 0];
	BRAIN2.postSynaptic2['VB8'] = [0, 0];
	BRAIN2.postSynaptic2['VB9'] = [0, 0];
	BRAIN2.postSynaptic2['VC1'] = [0, 0];
	BRAIN2.postSynaptic2['VC2'] = [0, 0];
	BRAIN2.postSynaptic2['VC3'] = [0, 0];
	BRAIN2.postSynaptic2['VC4'] = [0, 0];
	BRAIN2.postSynaptic2['VC5'] = [0, 0];
	BRAIN2.postSynaptic2['VC6'] = [0, 0];
	BRAIN2.postSynaptic2['VD1'] = [0, 0];
	BRAIN2.postSynaptic2['VD10'] = [0, 0];
	BRAIN2.postSynaptic2['VD11'] = [0, 0];
	BRAIN2.postSynaptic2['VD12'] = [0, 0];
	BRAIN2.postSynaptic2['VD13'] = [0, 0];
	BRAIN2.postSynaptic2['VD2'] = [0, 0];
	BRAIN2.postSynaptic2['VD3'] = [0, 0];
	BRAIN2.postSynaptic2['VD4'] = [0, 0];
	BRAIN2.postSynaptic2['VD5'] = [0, 0];
	BRAIN2.postSynaptic2['VD6'] = [0, 0];
	BRAIN2.postSynaptic2['VD7'] = [0, 0];
	BRAIN2.postSynaptic2['VD8'] = [0, 0];
	BRAIN2.postSynaptic2['VD9'] = [0, 0];
};

BRAIN2.update = function () {
	if (BRAIN2.stimulateHungerNeurons2) {
		BRAIN2.dendriteAccumulate('RIML');
		BRAIN2.dendriteAccumulate('RIMR');
		BRAIN2.dendriteAccumulate('RICL');
		BRAIN2.dendriteAccumulate('RICR');
		BRAIN2.runconnectome();
	}
	if (BRAIN2.stimulateNoseTouchNeurons2) {
		BRAIN2.dendriteAccumulate('FLPR');
		BRAIN2.dendriteAccumulate('FLPL');
		BRAIN2.dendriteAccumulate('ASHL');
		BRAIN2.dendriteAccumulate('ASHR');
		BRAIN2.dendriteAccumulate('IL1VL');
		BRAIN2.dendriteAccumulate('IL1VR');
		BRAIN2.dendriteAccumulate('OLQDL');
		BRAIN2.dendriteAccumulate('OLQDR');
		BRAIN2.dendriteAccumulate('OLQVR');
		BRAIN2.dendriteAccumulate('OLQVL');
		BRAIN2.runconnectome();
	}
	if (BRAIN2.stimulateFoodSenseNeurons2) {
		BRAIN2.dendriteAccumulate('ADFL');
		BRAIN2.dendriteAccumulate('ADFR');
		BRAIN2.dendriteAccumulate('ASGR');
		BRAIN2.dendriteAccumulate('ASGL');
		BRAIN2.dendriteAccumulate('ASIL');
		BRAIN2.dendriteAccumulate('ASIR');
		BRAIN2.dendriteAccumulate('ASJR');
		BRAIN2.dendriteAccumulate('ASJL');
		BRAIN2.runconnectome();
	}

	//RIML RIMR RICL RICR hunger neurons
	//PVDL PVDR nociceptors
	//ASEL ASER gustatory neurons
};

BRAIN2.runconnectome = function () {
	for (var ps2 in BRAIN2.postSynaptic2) {
		/* Muscles cannot fire, make sure they don't */
		if (
			BRAIN2.muscles2.indexOf(ps2.substring(0, 3)) == -1 &&
			BRAIN2.postSynaptic2[ps2][BRAIN2.thisState2] > BRAIN2.fireThreshold2
		) {
			BRAIN2.fireNeuron(ps2);
		}
	}

	BRAIN2.motorcontrol();

	for (var ps2 in BRAIN2.postSynaptic2) {
		BRAIN2.postSynaptic2[ps2][BRAIN2.thisState2] =
			BRAIN2.postSynaptic2[ps2][BRAIN2.nextState2];
	}

	var temp2 = BRAIN2.thisState2;
	BRAIN2.thisState2 = BRAIN2.nextState2;
	BRAIN2.nextState2 = temp2;
};

BRAIN2.fireNeuron = function (fneuron2) {
	/* The threshold has been exceeded and we fire the neurite */
	if (fneuron2 !== 'MVULVA') {
		BRAIN2.dendriteAccumulate(fneuron2);
		BRAIN2.postSynaptic2[fneuron2][BRAIN2.nextState2] = 0;
	}
};

BRAIN2.motorcontrol = function () {
	/* accumulate left and right muscles and the accumulated values are
       used to move the left and right motors of the robot */

	BRAIN2.accumleft2 = 0;
	BRAIN2.accumright2 = 0;

	for (var m2 = 0; m2 < BRAIN2.muscleList2.length; m2++) {
		var muscleName2 = BRAIN2.muscleList2[m2];

		if (BRAIN2.mLeft2.indexOf(muscleName2) != -1) {
			BRAIN2.accumleft2 += BRAIN2.postSynaptic2[muscleName2][BRAIN2.nextState2];
			BRAIN2.postSynaptic2[muscleName2][BRAIN2.nextState2] = 0;
		} else if (BRAIN2.mRight2.indexOf(muscleName2) != -1) {
			BRAIN2.accumright2 += BRAIN2.postSynaptic2[muscleName2][BRAIN2.nextState2];
			BRAIN2.postSynaptic2[muscleName2][BRAIN2.nextState2] = 0;
		}
	}
};
