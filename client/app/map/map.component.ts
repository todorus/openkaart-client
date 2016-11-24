import { Component, OnInit } from '@angular/core';
import Polygon = L.Polygon;

@Component({
    selector: 'map',
    template: `
        <div id="map-inner"></div>
    `,
    styleUrls: ['app/map/map.css']
})
export class MapComponent {

    private BOUNDS_OPTIONS = {paddingTopLeft: [400, 10], paddingBottomRight: [10,10]};

    layer;
    map;

    constructor() {
        console.log("construct");
    }

    ngOnInit(){
      this.map = L.map('map-inner', {zoomControl:false});
      this.defaultZoom();

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidG9kb3J1cyIsImEiOiJjaWs4anUwZmswMndqdHhrd2d0bXFtMndjIn0.B-Btjtonfl0WE1sDNcu_9A', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: 'mapbox.light'
      }).addTo(this.map);
    }

    private defaultZoom(){
        let netherlandsBounds = L.latLngBounds(
            L.latLng(53.667019, 3.273926),
            L.latLng(50.509497, 7.404785)
        );
        this.map.fitBounds(netherlandsBounds, this.BOUNDS_OPTIONS);
    }

}
