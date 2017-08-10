/**
 * 场景管理
 */

class ViewManager {
    public static _instance:ViewManager = null;

    // 注册过的场景列表
    public sceneList:Array<any> = [];

    public currentScene:any = null;
    private lastScene:any = null;

    public constructor() {
    }

    static getInstance(){
        if(ViewManager._instance == null){
            return ViewManager._instance = new ViewManager();
        }else{
            return ViewManager._instance;
        }
    }

    /**
     * 场景的切换
     * @param stageName 切换的场景name
     * @param target addChild的上下文
     */
    public changeScene(stageName:string,target:any):any{
        let _temp:any;

        for(let i = 0; i<this.sceneList.length ; i++){
            if(this.sceneList[i].name == stageName){
                _temp = this.sceneList[i];
                this.lastScene  = this.currentScene;
                this.currentScene = _temp;

                target.addChild(_temp);
                if(this.lastScene){
                    try{
                        this.lastScene.onExit();
                    }catch(e){
                        // 却少onExit函数
                        throw new Error(e);
                    }
                    this.lastScene.visible = false;
                }
                try{
                    _temp.onEnter();
                }catch(e){
                    throw new Error(e);
                }
                return;
            }
        }
        throw new Error ("No match scene");
    }

    /**
     * 场景的创建
     * @param stageName 场景名称
     * @param sceneClass 场景类
     */
    public setScene(sceneClass:any,stageName:string = null):void{
        let scene = new sceneClass();
        if(stageName!=null){
            scene.name = stageName;
        }
        this.sceneList.push(scene);
    }
}