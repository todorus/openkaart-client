import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { Region } from '../regions/region';
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

    constructor(private mapService:MapService) {
        console.log("construct");
        mapService.selection$.subscribe(selection => this.showRegions(selection));
        mapService.focus$.subscribe(region => this.hover(region));
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

    private showRegions(regions:Region[]){
        if(this.layer != null){
            this.map.removeLayer(this.layer);
        }

        if(regions == null || regions.length == 0){
            console.warn("No regions to show", regions);
            this.defaultZoom();
            return;
        }

        var polygons = {
            type: "FeatureCollection",
            features: []
        };

        for (var i = 0; i < regions.length; i++) {
            var region = regions[i];
            var geometry = region.geometry;
            geometry["mapService"] = this.mapService;
            geometry["region"] = region;
            geometry["properties"] = {
              "uuid": region.uuid,
              "name": region.name,
              "type": region.type
            };

            if (geometry != undefined && geometry != null) {
                polygons["features"].push(geometry);
            }
        }

        if(polygons["features"].length == 0){
            console.warn("Regions have no area", regions);
            this.defaultZoom();
            return;
        }

        this.layer = L.geoJSON(polygons);
        if(this.layer != null) {
            this.layer.setStyle(
                {
                    color: '#35886F',
                    fillColor: '#43AA8B'
                }
            );
            this.layer.on(
                {
                    mouseover: this.onMouseOver,
                    mouseout: this.onMouseOut,
                    click: this.onClick
                }
            )
            this.map.addLayer(this.layer);
            this.map.fitBounds(this.layer.getBounds(), this.BOUNDS_OPTIONS);
        }
    }

    private hover(region:Region):void {

        this.layer.eachLayer(function(layer){
            if(region == null || layer.feature.properties["uuid"] != region.uuid){
                layer.setStyle(
                    {
                        color: '#35886F',
                        fillColor: '#43AA8B'
                    }
                )
            } else {
                layer.setStyle(
                    {
                        color: '#255F4E',
                        fillColor: '#2D755F'
                    }
                )
            }
        });
    }

    private onMouseOver(e){
        var feature =  e.layer.feature;
        var region = feature.region;
        var mapService = feature.mapService;
        mapService.focus(region);
    }

    private onMouseOut(e){
        var feature =  e.layer.feature;
        var region = feature.region;
        var mapService = feature.mapService;
        mapService.focus(null);
    }

    private onClick(e){
        var feature =  e.layer.feature;
        var region = feature.region;
        var mapService = feature.mapService;

        if(mapService.editMode){
            mapService.deselect(region);
        }
    }

}
