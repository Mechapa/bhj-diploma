/**
 * Основная функция для совершения запросов
 * на сервер.
 * */  
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    let url = options.url;
    const formData = new FormData();

    if(options.method !== "GET"){
        for(let key in options.data){
            formData.append(key, options.data[key]);
        }
    } else {
      url = "";
        for(let key in options.data){
          options.url += `?${key}=${options.data[key]}`;
        }
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
