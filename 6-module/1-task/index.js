import createElement from '../../assets/lib/create-element.js';
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#renderer();
    this.#closer(this.elem);
  }

  #template () {
    return `
     <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      ${this.#tableContentMaker(this.#rows)}
      </tbody>
      </table>
      `;
  }

  #renderer () {
    this.elem = createElement(this.#template());
  }

  #tableContentMaker(arr) {
    let buttonTemplate = `<td><button class='closing-button'>X</button></td>`;
    return arr.map((user) => {
      let temp = [];
      for (let parameter in user) {
        temp.push(`<td>${user[parameter]}</td>$`);
      } return `<tr>${temp} ${buttonTemplate}</tr>`;
    });
  }

  #closer = () => {
    this.elem.addEventListener('click', (event) => {
      if (event.target.getAttribute('class') === 'closing-button') {
        event.target.closest('tr').remove();
      }
    });
  }
}
