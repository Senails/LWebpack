import * as $ from 'jquery';

function createanalytics() {
    let counter = 0;
    let flag = false;

    let clickhand = () => {
        counter++;
        console.log(counter)
    }

    $(document).on('click', clickhand)

    return {
        destoy() {
            $(document).off('click', clickhand)
            flag = true;
        },
        getclicks() {
            return !flag ? counter : 'Analitycs is destroyd !!!!!!!!!!!';
        }
    }
}

window.analytics = createanalytics();