
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('Audio/GameAudio')
export default class GameAudio extends cc.Component {
    // @property(cc.AudioClip)
    // clipss: cc.AudioClip[] = [];

    clips: cc.AudioClip[];

    static Instance: GameAudio;
    private static sources: { [key: string]: cc.AudioSource } = {};

    onLoad() {
        GameAudio.Instance = this;
    }

    init(clips) {
        this.clips = clips;
        for (let i = 0; i < this.clips.length; i++) {
            const clip = this.clips[i];
            const audioSource = this.addComponent(cc.AudioSource);
            audioSource.clip = clip;
            audioSource.volume = 0;
            GameAudio.sources[clip.name + '.mp3'] = audioSource;
        }
    }

    onDestroy() {
        GameAudio.currentMusicSource = null;
    }

    static currentMusicSource: cc.AudioSource;

    static playMusic(path: string, loop: boolean) {
        this.stopMusic();
        const s = this.playAudio(path, loop, 1);
        this.currentMusicSource = s;
    }

    static pauseMusic() {
        if (this.currentMusicSource != null)
            this.currentMusicSource.pause();
    }

    static resumeMusic() {
        if (this.currentMusicSource != null)
            this.currentMusicSource.resume();
    }

    static stopMusic() {
        if (this.currentMusicSource != null) {
            try {
                this.currentMusicSource.stop();
            } catch (error) {
                cc.log(error);
            }
        }
    }

    static stopAll() {
        for (const key in this.sources) {
            if (this.sources.hasOwnProperty(key)) {
                const element = this.sources[key];
                element.stop();
            }
        }
    }

    static playAudio(path: string, loop: boolean, vol = 1): cc.AudioSource {
        const s = this.sources[path];
        s.volume = vol;
        s.loop = loop;
        s.scheduleOnce(() => {
            s.play();
        }, 0.0001);
        return s;
    }
}