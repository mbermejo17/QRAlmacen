

export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {

        this.format = format;
        this.text = text;

        this.created = new Date();

        this.determinarTipo();

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

        const dataType = JSON.parse(this.text);
        console.log('TIPO', dataType);

        switch (dataType) {

            case ' Location':
                this.type = 'Location';
                this.icon = 'ping';
                break;

            case ' Article':
                this.type = 'Article';
                this.icon = 'globe';
                break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }

    }
}
