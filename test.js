function addReview()
{
    var preview=document.getElementById("custom_review");
    var name=prompt("Your Name:");
    var S=prompt("Enter Star Rating:");
    var review=prompt("Enter Review:");
    var star=""
    var S_1="★☆☆☆☆";
    var S_2="★★☆☆☆";
    var S_3="★★★☆☆";
    var S_4="★★★★☆";
    var S_5="★★★★★";
    if(S==1)
    {
        star=S_1;
    }
    else if(S==2)
    {
        star=S_2;
    }
    else if(S==3)
    {
        star=S_3;
    }
    else if(S==4)
    {
        star=S_4;
    }
    else
    {
        star=S_5;
    }
    preview.innerHTML+='<div class="review-card"><div class="customer-info"><img src="artist-03.png" alt="Customer 3" class="customer-photo"><span class="customer-name">'+name+'</span></div><div class="stars">'+star+'</div><p>'+review+'</p></div>';
}