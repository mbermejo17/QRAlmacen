export class Article {

    constructor(
        public Name : string,
        public Description : string,
        public PartNumber : string,
        public SerialNumber : string,
        public BarCode : string,
        public QRCode : string,
        public Location : string,
        public Status : string,
        public ScanPending : boolean,
        public EditPendig : boolean,
        public Images : string,
        public Manufacturer : string,
        public Comment : string,
        public LastUpdate : Date,
        public LastMovement : string,
        public LastOrigin : string,
        public LastDestination : string,
        public _id?: string
    ) { }

}
