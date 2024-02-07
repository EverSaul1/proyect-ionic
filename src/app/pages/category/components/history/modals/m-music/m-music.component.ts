import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-music',
  templateUrl: './m-music.component.html',
  styleUrls: ['./m-music.component.scss'],
})
export class MMusicComponent  implements OnInit {

  playlist:any = [
    {
      id: 1,
      title: 'Laberinto de fauno',
      src: 'assets/sounds/lbf.mp3'
    },
    {
      id: 2,
      title: 'Death ',
      src: 'assets/sounds/death.mp3'
    }
  ]
  currentTrack: any;
  audioPlayer!: HTMLAudioElement;
  isPlaying!: boolean;
  progress!: number;
  volume!: number;
  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.storage.get('currentTrackIndex').then(index => {
      if (index !== null) {
        this.currentTrack = this.playlist[index];
      } else {
        this.currentTrack = this.playlist[0];
      }
      this.audioPlayer = new Audio(this.currentTrack.src);
      this.audioPlayer.addEventListener('ended', () => {
        this.nextTrack();
      });
    });
    // Recuperar el valor del volumen desde el almacenamiento
    this.storage.get('volume').then(volume => {
      this.volume = volume !== null ? volume : 0;
      // Establecer el valor del volumen en el reproductor de audio
      this.audioPlayer.volume = this.volume;
    });
  }
  playPause() {
    if (this.isPlaying) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  previousTrack() {
    const currentIndex = this.playlist.indexOf(this.currentTrack);
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      this.currentTrack = this.playlist[previousIndex];
      this.audioPlayer.src = this.currentTrack.src;
      this.audioPlayer.play();
      this.isPlaying = true;
      this.storage.set('currentTrackIndex', previousIndex);
    }
  }

  nextTrack() {
    const currentIndex = this.playlist.indexOf(this.currentTrack);
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.playlist.length) {
      this.currentTrack = this.playlist[nextIndex];
      this.audioPlayer.src = this.currentTrack.src;
      this.audioPlayer.play();
      this.isPlaying = true;
      this.storage.set('currentTrackIndex', nextIndex);
    }
  }
  onVolumeChange(event: any) {
    const newVolume = event.detail.value;
    this.volume = newVolume;
    // Establecer el valor del volumen en el reproductor de audio
    this.audioPlayer.volume = this.volume;
    // Guardar el valor del volumen en el almacenamiento
    this.storage.set('volume', this.volume);
  }
  ionViewWillLeave() {
    if (this.audioPlayer && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.isPlaying = false;
    }
  }
}
