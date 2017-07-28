/***Author:々守朢 星塵ヅ  2016-05-31***/
//碰撞
function Collision(AX1, AY1, AX2, AY2, BX1, BY1, BX2, BY2){
    if(AX1 < BX1){
        if(AX2 < BX1){return false;}
        else{
            if(AY1 < BY1){
                if(AY2 < BY1) return false;
                else return true;
            }else{
                if(AY1 > BY2) return false;
                else return true;
            }
        }
    }else{
        if(AX1 > BX2){return false;}
        else{
            if(AY1 < BY1){
                if(AY2 < BY1) return false;
                else return true;
            }else{
                if(AY1 > BY2) return false;
                else return true;
            }
        }
    }
    return false;
}