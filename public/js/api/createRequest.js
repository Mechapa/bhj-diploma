/**
 * Основная функция для совершения запросов
 * на сервер.
 * */  
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    if(options.method !== "GET"){
    //xhr.open(options.method, options.url);

        const formData = new FormData();
        for(let key in options.data){
            formData.append(key, options.data[key]);
        }
       // xhr.send(formData);
    } else {
        for(let key in options.data){
            url += `?${key}=${options.data[key]}`;
        }
       // xhr.open("GET", options.url + myStr);
        //xhr.send();
    }

    try {
        xhr.open(options.method, options.url);
        xhr.send(options.method !== "GET" ? formData : null);
    } catch (error) {
        callback(error);
    }

    xhr.onload = () => {
            options.callback(xhr.response.error, xhr.response)
    }
};
