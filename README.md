<div align="center"> 
<img src="https://raw.githubusercontent.com/kubeTasker/kubeTaskerServer/master/logo.png" width="300px" height="300px"/>
<h1>kubeTasker UI</h1>
</div>

**中文** 

## 简介

kubeTasker UI 是基于 vue-vben-admin 二次开发的为 kubeTasker 专门开发的后台管理界面，基于 Vue3 和 TypeScript 开发， 提供后台错误统一处理，国际化等功能，支持 k8s 云原生管理界面，接入 workflow 支持任务流管理

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 支持功能

- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
- 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
- 岗位管理：配置系统用户所属担任职务。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识，接口权限等。
- 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
- 字典管理：对系统中经常使用的一些较为固定的数据进行维护。
- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
- 会员管理：管理注册会员信息
- 接口文档：根据业务代码自动生成相关的 api 接口文档。
- 代码生成：根据数据表结构生成对应的增删改查相对应业务
- 服务监控：查看一些服务器的基本信息


**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## License

[MIT © Ryan-2022](./LICENSE)
