/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector(".sidebar-toggle").addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
      document.body.classList.toggle("sidebar-collapse");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector(".sidebar").addEventListener("click", event => {
      if(event.target.closest( ".menu-item_login" )){
        App.getModal("login").open();
      } else if(event.target.closest( ".menu-item_register" )) {
        App.getModal("register").open();
      } else if(event.target.closest( ".menu-item_logout" )){
        let data = JSON.parse(localStorage.getItem("user"));
        User.logout(data, (err, response) => {
          if(response.success){
            App.setState('init');
          }
        })
      };
    })
  }
}