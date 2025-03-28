// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.

function composite( bgImg, fgImg, fgOpac, fgPos )
{

    dataArray = Array.from(bgImg.data);
    for(i=3; i<fgImg.data.length; i+=4){ //get alpha channel
        let alphafg = (fgImg.data[i]/255)*fgOpac; 
        if(alphafg>0){
            for(j=i-3; j<i;j++){ //get rgb channel
                //calculate position on fg image
                let x = (j/4)%fgImg.width;
                let y = Math.floor((j/4)/fgImg.width);
                //calculate position on bg image
                let xb = x+fgPos["x"];
                let yb = y+fgPos["y"];
                //calculate corresponding pixel
                let jb = (yb*bgImg.width+xb)*4;
                //check bounds
                if(xb>=0 && xb<bgImg.width && yb>=0 && yb<bgImg.height){
                    dataArray[jb]=fgImg.data[j]*alphafg+(1-alphafg)*dataArray[jb];
                }
                                                  
            }
        }
        
    }
    
    bgImg.data.set(dataArray);//set new background

}