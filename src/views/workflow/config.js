export default {
    //后端接口路径
    // loginAuth: 'http://localhost:9100/api/login',
    // k8sWorkflowCreate: 'http://localhost:9100/api/k8s/workflow/create',
    // k8sWorkflowDetail: 'http://localhost:9100/api/k8s/workflow/detail',
    // k8sWorkflowList: 'http://localhost:9100/api/k8s/workflows',
    // k8sWorkflowDel: 'http://localhost:9100/api/k8s/workflow/del',

    k8sDeploymentList: 'http://localhost:9100/k8sdeployment/get_deployments',
    k8sDeploymentDetail: 'http://localhost:9100/k8sdeployment/get_deployment_detail',
    k8sDeploymentUpdate: 'http://localhost:9100/k8sdeployment/update_deployment',
    k8sDeploymentScale: 'http://localhost:9100/k8sdeployment/scale_deployment',
    k8sDeploymentRestart: 'http://localhost:9100/k8sdeployment/restart_deployment',
    k8sDeploymentDel: 'http://localhost:9100/k8sdeployment/delete_deployment',
    k8sDeploymentCreate: 'http://localhost:9100/k8sdeployment/create_deployment',
    k8sDeploymentNumNp: 'http://localhost:9100/k8sdeployment/get_deploy_num_per_np',

    k8sPodList: 'http://localhost:9100/k8spod/get_pods',
    k8sPodDetail: 'http://localhost:9100/k8spod/get_pod_detail',
    k8sPodUpdate: 'http://localhost:9100/k8spod/update_pod',
    k8sPodDel: 'http://localhost:9100/k8spod/delete_pod',
    k8sPodContainer: 'http://localhost:9100/k8spod/get_pod_container',
    k8sPodLog: 'http://localhost:9100/k8spod/get_pod_log',
    k8sPodNumNp: 'http://localhost:9100/k8spod/get_pod_num_per_np',

    // k8sDaemonSetList: 'http://localhost:9100/api/k8s/daemonsets',
    // k8sDaemonSetDetail: 'http://localhost:9100/api/k8s/daemonset/detail',
    // k8sDaemonSetUpdate: 'http://localhost:9100/api/k8s/daemonset/update',
    // k8sDaemonSetDel: 'http://localhost:9100/api/k8s/daemonset/del',

    // k8sStatefulSetList: 'http://localhost:9100/api/k8s/statefulsets',
    // k8sStatefulSetDetail: 'http://localhost:9100/api/k8s/statefulset/detail',
    // k8sStatefulSetUpdate: 'http://localhost:9100/api/k8s/statefulset/update',
    // k8sStatefulSetDel: 'http://localhost:9100/api/k8s/statefulset/del',

    k8sServiceList: 'http://localhost:9100/k8sservice/get_services',
    k8sServiceDetail: 'http://localhost:9100/k8sservice/get_service_detail',
    k8sServiceUpdate: 'http://localhost:9100/k8sservice/update_service',
    k8sServiceDel: 'http://localhost:9100/k8sservice/delete_service',
    k8sServiceCreate: 'http://localhost:9100/k8sservice/create_service',

    // k8sIngressList: 'http://localhost:9100/api/k8s/ingresses',
    // k8sIngressDetail: 'http://localhost:9100/api/k8s/ingress/detail',
    // k8sIngressUpdate: 'http://localhost:9100/api/k8s/ingress/update',
    // k8sIngressDel: 'http://localhost:9100/api/k8s/ingress/del',
    // k8sIngressCreate: 'http://localhost:9100/api/k8s/ingress/create',

    k8sConfigMapList: 'http://localhost:9100/k8sconfigmap/get_config_maps',
    k8sConfigMapDetail: 'http://localhost:9100/k8sconfigmap/get_config_map_detail',
    k8sConfigMapUpdate: 'http://localhost:9100/k8sconfigmap/update_config_map',
    k8sConfigMapDel: 'http://localhost:9100/k8sconfigmap/delete_config_map',

    // k8sSecretList: 'http://localhost:9100/api/k8s/secrets',
    // k8sSecretDetail: 'http://localhost:9100/api/k8s/secret/detail',
    // k8sSecretUpdate: 'http://localhost:9100/api/k8s/secret/update',
    // k8sSecretDel: 'http://localhost:9100/api/k8s/secret/del',

    // k8sPvcList: 'http://localhost:9100/api/k8s/pvcs',
    // k8sPvcDetail: 'http://localhost:9100/api/k8s/pvc/detail',
    // k8sPvcUpdate: 'http://localhost:9100/api/k8s/pvc/update',
    // k8sPvcDel: 'http://localhost:9100/api/k8s/pvc/del',

    // k8sNodeList: 'http://localhost:9100/api/k8s/nodes',
    // k8sNodeDetail: 'http://localhost:9100/api/k8s/node/detail',

    // k8sNamespaceList: 'http://localhost:9100/api/k8s/namespaces',
    // k8sNamespaceDetail: 'http://localhost:9100/api/k8s/namespace/detail',
    // k8sNamespaceDel: 'http://localhost:9100/api/k8s/namespace/del',

    // k8sPvList: 'http://localhost:9100/api/k8s/pvs',
    // k8sPvDetail: 'http://localhost:9100/api/k8s/pv/detail',

    // k8sTerminalWs: 'ws://localhost:8081/ws',

    //编辑器配置
    cmOptions: {
        // 语言及语法模式
        mode: 'text/yaml',
        // 主题
        theme: 'idea',
        // 显示行数
        lineNumbers: true,
        smartIndent: true, //智能缩进
        indentUnit: 4, // 智能缩进单元长度为 4 个空格
        styleActiveLine: true, // 显示选中行的样式
        matchBrackets: true, //每当光标位于匹配的方括号旁边时，都会使其高亮显示
        readOnly: false,
        lineWrapping: true //自动换行
    }
}