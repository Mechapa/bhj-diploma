/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.element = element;
    this.select = element.querySelector(".accounts-select");
    this.renderAccountsList(); 
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
   renderAccountsList() {
    if(User.current()){
      Account.list(User.current(), (err, response) => {
        if(response && response.data){
          this.select.innerHTML = "";
          const renderData = (item) => `<option value="${item.id}">${item.name}</option>`;
          this.select.innerHTML = response.data.reduce((total, item) => total + renderData(item), '');
        }
      });
    }
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response){
        this.element.reset();
        App.getModal(this.element.closest(".modal").dataset.modalId).close();
        App.update();
      }
    })
  }
}