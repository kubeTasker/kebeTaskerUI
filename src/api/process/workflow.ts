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
export async function getWorkflow(namespace: string, name: string): Promise<WorkflowRespond> {
  try {
    // 使用 fetch 发送 GET 请求
    const response = await fetch(`/workflow/get_workflow/${namespace}/${name}`);
    // 将响应解析为 JSON 格式
    const data = await response.json();
    // 返回解析后的数据，并指定类型为 WorkflowRespond
    return data as WorkflowRespond;
  } catch (error) {
    // 捕获异常并打印错误信息
    console.error('获取 Workflow 数据时出错：', error);
    // 抛出异常，以便在调用方进行处理
    throw error;
  }
}