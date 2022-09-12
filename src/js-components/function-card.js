function srcPoster ( el ) {
    return `https://image.tmdb.org/t/p/w342${ el.poster_path }`;
}

function starsVote ( el ) {
    return Math.floor( el.vote_average / 2 );
}

function starsRest ( el ) {
    return ( 5 - this.starsVote( el ) );
}

function srcFlag ( el ) {
    if ( el.toLowerCase() === 'en' ) el = 'gb';
    if ( el.toLowerCase() === 'el' ) el = 'gr';
    return `https://flagcdn.com/16x12/${ el.toLowerCase() }.png`;
}

export { srcPoster, starsVote, starsRest, srcFlag }