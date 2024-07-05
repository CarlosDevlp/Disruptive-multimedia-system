export const generateYoutubeUrlEmbed= (url:string)=>{
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
};