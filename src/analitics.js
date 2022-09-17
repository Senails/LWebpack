function createanalytics() {
    let counter = 0;
    let flag = false;

    let clickhand = () => {
        counter++;
        console.log(counter)
    }

    document.addEventListener('click', clickhand);

    return {
        destoy() {
            document.removeEventListener('click', clickhand);
            flag = true;
        },
        getclicks() {
            return !flag ? counter : 'Analitycs is destroyd !!!';
        }
    }
}

window.analytics = createanalytics();