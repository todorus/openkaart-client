import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import { Region } from '../regions/region';

@Injectable()
export class MapService {

    private selectionStore: Region[] = [];
    private selectionSubject: Subject<Region[]> = new Subject<Region[]>()
    selection$ = this.selectionSubject.asObservable();

    private focusStore: Region = null;
    private focusSubject: Subject<Region> = new Subject<Region>()
    focus$ = this.focusSubject.asObservable();

    show(region: Region): void {
        console.log("show");
        this.selectionStore = [region];
        this.selectionSubject.next(this.selectionStore);
    }

    clear(): void {
        this.selectionStore = [];
        this.selectionSubject.next(this.selectionStore);
    }

    focus(region: Region): void {
        for (var i:number = 0; i < this.selectionStore.length; i++) {
            var candidate: Region = this.selectionStore[i];
            candidate.hover = region != null && region.uuid == candidate.uuid;
        }
        this.focusSubject.next(region);
    }

}
