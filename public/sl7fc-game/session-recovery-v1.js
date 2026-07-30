(()=>{
  try{
    if(typeof state==='undefined'||!state)return;
    const interrupted=(typeof pending!=='undefined'&&!pending)&&typeof view!=='undefined'&&view==='prematch';
    if(!interrupted)return;
    view='dashboard';
    state.screen='dashboard';
    if(typeof save==='function')save();
    if(typeof render==='function')render();
  }catch(error){
    console.error('SL7 session recovery failed',error);
  }
})();