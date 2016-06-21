import TextPrefab from '../TextPrefab';

export default class extends TextPrefab {

	selectionOver() {

	    this.fill = "#FFFF00";
	}

	selectionOut() {

	    this.fill = "#FFFFFF";
	}
}

