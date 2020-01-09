

export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {

        this.format = format;
        this.text = this.convertToJSON(text);

        this.created = new Date();

        this.determinarTipo();

    }

    convertToJSON(text) {
        let resultText = text.replace(/{/g, '{"');
        resultText = resultText.replace(/}/g, '"}');
        resultText = resultText.replace(/:/g, '":"');
        resultText = resultText.replace(/,/g, '","');
        console.log(JSON.parse(resultText));
        return resultText;
    }


    /* private determinarTipo() {

        const inicioTexto = this.text.substr(0, 4);
        console.log('TIPO', inicioTexto );

        switch ( inicioTexto ) {

            case 'http':
                this.type = 'http';
                this.icon = 'globe';
            break;

            case 'geo:':
                this.type = 'geo';
                this.icon = 'pin';
            break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }

    } */
    private determinarTipo() {

        const data = JSON.parse(this.text);
        console.log('TIPO', data.DataType);

        switch (data.DataType) {

            case 'Location':
                this.type = 'Location';
                this.icon = 'ping';
                break;

            case 'Article':
                this.type = 'Article';
                this.icon = 'globe';
                break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }

    }
}
