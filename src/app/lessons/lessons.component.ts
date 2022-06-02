import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable, of} from 'rxjs';
import {Lesson} from "../model/lesson";
import {SwPush, SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {catchError, filter, map} from 'rxjs/operators';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    constructor(private lessonsService: LessonsService,
      private swUpdate: SwUpdate) {

    }

    ngOnInit() {
        this.loadLessons();
        console.log("adding subscriber");
        console.log(this.swUpdate.isEnabled);
        if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe(() => {
            console.log('UPDATED');
            if (confirm("New version available. Load new version?"))
              window.location.reload()
            });
        this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => (
          console.log({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion,
        }))));
        };

    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err => of([])));
    }

}
