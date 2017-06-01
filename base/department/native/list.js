export default {
  "name": "list",
  "text": "部门列表",
  "url": "saas-plat-appfx/list",
  "config": {
    "data": {
      "model": "DepartmentList",
      "parentKey": "pid"
    },
    "actions": {
      "toggleEnable": {
        "command": "toggle",
        "args": {
          "sendCommand": ["changeEnable", {
            "id": "$tree.selected.id",
            "enable": "!$tree.selected.enabled"
          }]
        }
      },
      "openEmployee": {
        "command": "open",
        "args": {
          "modulename": "erp.base.employee.detail",
          "defaults": {
            "department": "$tree.selected.name"
          }
        }
      },
      "deleteDepartment": {
        "command": "delete",
        "args": {
          "sendCommand": ["deleteDepartment", {
            "id": "$tree.selected.id"
          }]
        }
      },
      "openDepartmentList": {
        "command": "goto",
        "args": {
          "pid": "$tree.selected.hid"
        }
      },
      "filterEnable": {
        "command": "filter",
        "args": {
          "filter": "@item.enabled==true"
        }
      },
      "filterAll": {
        "command": "filter"
      }
    },
    "views": {
      "toolbar": {
        "showCount": 2,
        "items": [{
          "name": "search",
          "icon": "magnifier",
          "text": "查找",
          "action": "search"
        }, {
          "name": "addDepartment",
          "text": "添加部门",
          "action": "add",
          "icon": "plus"
        }, {
          "name": "addEmployee",
          "text": "添加员工",
          "action": "openEmployee",
          "icon": "user-follow"
        }, {
          "name": "edit",
          "text": "删除",
          "action": "edit"
        }]
      },
      "filter": {
        "selectedIndex": 0,
        "buttons": [{
          "name": "enabled",
          "text": "启用",
          "action": "filterEnable"
        }, {
          "name": "all",
          "text": "全部",
          "action": "filterAll"
        }]
      },
      "list": {
        "row": [{
          "name": "text",
          "text": "$item.text",
          "flex": 1
        }, {
          "name": "enabled",
          "value": "!$item.enabled && '停用'"
        }],
        "actions": [{
          "filter": "$ctx.mode!='edit'",
          "name": "changeStatus",
          "text": "$item.enabled?'启用':'停用'",
          "action": "toggleEnable"
        }, {
          "filter": "$ctx.mode==edit",
          "name": "delete",
          "text": "删除",
          "action": "deleteDepartment"
        }]
      },
      "editMode": {

      }
    }
  }
}
