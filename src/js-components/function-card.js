function srcPoster ( el ) {
    if ( el.poster_path === null ) return require('../assets/logo2.png');
    return `https://image.tmdb.org/t/p/w342${ el.poster_path }`;
}

function starsVote ( el ) {
    return Math.floor( el.vote_average / 2 );
}

function starsRest ( el ) {
    return ( 5 - this.starsVote( el ) );
}

function srcFlag ( el ) {
    switch (el.toLowerCase()) {
        case 'en': el = 'gb'; break;
        case 'el': el = 'gr'; break;
        case 'ja': el = 'jp'; break;
        case 'ko': el = 'kp'; break;
        case 'ur': el = 'uy'; break;
    }
    return `https://flagcdn.com/16x12/${ el.toLowerCase() }.png`;
}

export { srcPoster, starsVote, starsRest, srcFlag };