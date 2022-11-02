import { Component, director, Material, ParticleSystem, SkyboxInfo, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Skybox')
export class Skybox extends Component {
    @property({ type: Material })
    public mat: Material = null;


    protected _skyboxInfo: SkyboxInfo = null;
    protected _time: number = 0;
  
    private _t: number = 0;
    start() {
        // Your initialization goes here.
    }

    onEnable() {
        this._skyboxInfo = director.getScene().globals.skybox;
      
       //  this._skyboxInfo.skyboxMaterial?.setProperty("ratio", 1.0);
    }

    onDisable(): void {}

    update(deltaTime: number) {
       

        this._skyboxInfo.rotationAngle = (Math.cos( director.root.cumulativeTime*0.05) + 1.0)*90;

       
        this._t++;
        let result = this._t % 1400;
        if (result < 300) {
           
            this._time = 0;
        } else if (result >= 300 && result <= 700) {
            this._time += 1.0 / 400.0;
        } else if (result > 700 && result < 1000) {
           
            this._time = 1.0;
        } else if (result >= 1000 && result < 1400) {
            this._time -= 1.0 / 400.0;
        }
        if (this._time > 1.0) {
            this._time = 1.0;
        }
       
        if (this._skyboxInfo && this._skyboxInfo.skyboxMaterial ) {
            //无效1
             this._skyboxInfo.skyboxMaterial?.setProperty("ratio", this._time);
             this._skyboxInfo._updatePipeline();
           //无效2
            //const h = this._skyboxInfo.skyboxMaterial.passes[0].getHandle('ratio');
            // this._skyboxInfo.skyboxMaterial.passes[0].setUniform(h,this._time);
            //可以执行
            // this._skyboxInfo.skyboxMaterial = this.mat;
            // this._skyboxInfo.skyboxMaterial.setProperty('ratio', this._time);
           
        }
    }

   
}
