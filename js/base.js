;
(function () {
  "use strict"
  var $from_add_task = $(".add-task"),
    new_task = {},
    task_list = {};
  init()
  $from_add_task.on("submit", function (e) {
    // 禁用默认行为
    e.preventDefault();
    // 获取新Task的值
    new_task.content = $(this).find('input[name=content]').val();
    // 如果task的值为空，则直接返回，否则继续执行
    if (!new_task.content) return;
    // 存入新的task
    if (add_task(new_task)) {
      render_task_list();
    }

  })
  // 新的task
  function add_task(new_task) {
    // 将task推入task_list
    task_list.push(new_task)
    // 更新localstorage
    store.set("task_list", task_list);
    return true;
    console.log(task_list);

  }
  // 推送数据到缓存中
  function init() {
    task_list = store.get('task_list') || []
  };

  function render_task_list() {
    var $task_list = $(".task-list");
    for (var i = 0; i < task_list.length; i++) {
      var $task = render_task_tpl(task_list[i])
      $task_list.append($task)
    }
  }

  function render_task_tpl(data) {
    var list_item_tpl =
      '<div class="task-item">' +
      '<span> <input type = "checkbox"/> </span>' +
      '<span class="task-content">' + data.content + '</span> ' +
      '<span>删除</span> ' +
      '<span>详细</span>' +
      '</div>';
    return $(list_item_tpl)
  }
})();