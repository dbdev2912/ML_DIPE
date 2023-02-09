const id = () => {
    return 'id' + (new Date()).getTime();
}

const openTab = ( url ) => {
    window.open(url, '_blank').focus();
}

export {
    id,
    openTab
}
