// 定义 WorkflowRespond 接口
interface WorkflowRespond {
    workflow: Workflow | null;
}

// 定义 Workflow 接口
interface Workflow {
    namespace:String;
    name:String;
}

// 发送 GET 请求获取 Workflow 数据的函数
async function getWorkflow(namespace: string, name: string): Promise<WorkflowRespond> {
    try {
        const response = await fetch(`/workflow/get_workflow/${namespace}/${name}`);
        const data = await response.json();
        return data as WorkflowRespond;
    } catch (error) {
        console.error('获取 Workflow 数据时出错：', error);
        throw error;
    }
}