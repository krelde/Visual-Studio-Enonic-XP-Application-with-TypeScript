interface IGeoPoint {
    equals(o: any): boolean;
    from(value: string): IGeoPoint;
    getLatitude(): any;
    getLongitude(): any;
    hashCode():number;
    toString(): string;
    Latitude: any;
    lat:any;
    Longitude:any;
    lon:any;
}