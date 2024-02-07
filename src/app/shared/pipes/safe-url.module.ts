import { NgModule } from '@angular/core';
import {SafeUrlPipe} from "./safe.pipe";
import {IonicModule} from "@ionic/angular";
@NgModule({
    declarations: [SafeUrlPipe],
    imports: [IonicModule],
    exports: [SafeUrlPipe]
})
export class SafeUrlModule {
}
