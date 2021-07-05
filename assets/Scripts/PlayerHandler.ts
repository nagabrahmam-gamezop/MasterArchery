
import { _decorator, Component, Node, systemEvent, SystemEventType, Prefab, instantiate, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerHandler')
export class PlayerHandler extends Component {

    // @property({type : Prefab})
    // private arrow: Node | null = null;

    private isMouseDown : boolean = false;
    private isMouseUp : boolean = false;

    start () {
        console.log('player handler start :>> ');
        // [3]
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);
    }

    update (deltaTime: number) {
        
    }

    public onMouseDown () : void {
        this.isMouseDown = true;
        this.isMouseUp = false;
    }

    public onMouseUp () : void {
        // if (this.isMouseDown) {
        //     this.isMouseUp = true;
        //     this.isMouseDown = false;
        // }
        // const arrow = instantiate(this.arrow);
        // if (arrow) {
        //     arrow.parent = this.node.parent
        //     const arrow_rb = arrow.getComponent(RigidBody2D);
        //     arrow_rb?.applyLinearImpulse(new Vec2(20, 15), new Vec2(-500, 500), true);
        // }
    }
}
