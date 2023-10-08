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
  get elem() {
    return document.querySelector ('.users-table');
  }

  constructor(rows) {
    if (!document.querySelector ('.table-head')) {
      let table = document.createElement ('table');
      let tableHead = document.createElement ('thead');
      table.classList.add ('users-table');
      tableHead.classList.add ('table-head');
      document.body.append (table);
      table.append (tableHead);
      tableHead.insertAdjacentHTML ('beforeend',
      `<thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>`);
      }
    const usersTable = document.querySelector ('.users-table');
    const buttonTemplate = `<button class='closing-button'>X</button>`;
    usersTable.append (document.createElement ('tbody'));
    usersTable.querySelector('tbody').classList.add ('users');
    const tableBody = document.querySelector ('.users');

    for (let user of rows) {
      let tableRow = document.createElement ('tr');
      tableBody.append (tableRow);
      for (let parameter in user) {
        let rowCell = document.createElement ('td');
        tableRow.append (rowCell);
        rowCell.innerHTML = `${user[parameter]}`;
      }
      let rowCell = document.createElement ('td');
      tableRow.append (rowCell);
      rowCell.insertAdjacentHTML ('beforeend', buttonTemplate);
    }

    tableBody.addEventListener ('click', (event) => {
      if (event.target.getAttribute ('class') == 'closing-button') {
        event.target.closest ('tr').remove();
      }
    });
  }
}
