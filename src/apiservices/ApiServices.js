class ApiService {

  constructor(
    baseUrl = "http://safelife-backend-env.eba-uhm6ta9p.us-east-1.elasticbeanstalk.com/graphql"


  ) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("authToken") || null;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token);
    window.dispatchEvent(new Event("auth:changed"));
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // window.dispatchEvent(new Event("auth:changed"));
  }

  isSignInOperation(query) {
    return /\bsignIn\s*\(/.test(query || "");
  }

  handleAuthError(code, message) {
    if (code === "UNAUTHORIZED") {
      this.clearToken();
      sessionStorage.setItem("authMessage", message || "Please log in to continue");
      if (window.location.pathname !== "/") window.location.assign("/");
      return;
    }

    if (code === "TOKEN_EXPIRED") {
      this.clearToken();
      sessionStorage.setItem("authMessage", "Your session has expired. Please log in again.");
      if (window.location.pathname !== "/") window.location.assign("/");
      return;
    }

    if (code === "TOKEN_INVALID") {
      this.clearToken();
      sessionStorage.setItem("authMessage", message || "Invalid session. Please log in again.");
      if (window.location.pathname !== "/") window.location.assign("/");
      return;
    }

    if (code === "FORBIDDEN") {
      sessionStorage.setItem("authMessage", "You do not have permission");
      return;
    }

    if (code === "AUTH_DISABLED") {
      sessionStorage.setItem("authMessage", message || "Backend auth configuration error");
    }
  }

  // Get headers for requests
  getHeaders() {
    this.token = localStorage.getItem("authToken") || this.token;
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic GraphQL request method
  async graphqlRequest(query, variables = {}) {
    try {
      const isSignIn = this.isSignInOperation(query);
      const token = localStorage.getItem("authToken") || this.token;

      if (!isSignIn && !token) {
        this.handleAuthError("UNAUTHORIZED", "Please log in to continue");
        throw new Error("Please log in to continue");
      }

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        const firstError = data.errors[0];
        const code = firstError?.extensions?.code || firstError?.code;
        if (code) this.handleAuthError(code, firstError?.message);
        if (code === "FORBIDDEN") {
          throw new Error("You do not have permission");
        }
        if (code === "AUTH_DISABLED") {
          throw new Error(firstError.message || "Backend auth configuration error");
        }
        throw new Error(firstError.message || "GraphQL error occurred");
      }

      return data;
    } catch (error) {
      console.error("GraphQL request failed:", error);
      throw error;
    }
  }

  // Authentication methods
  async signIn(email, password) {
    const query = `
      mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          token
          userId
          name
          email
          phoneNumber
          department {
            id
            name
          }
          role {
            id
            name
            key
            type
            permissions
          }
        }
      }
    `;
    const variables = { email, password };
    const response = await this.graphqlRequest(query, variables);

    if (response.data?.signIn?.token) {
      this.setToken(response.data.signIn.token);
      localStorage.setItem("user", JSON.stringify(response.data.signIn));
    }
    return response.data;
  }

  async signOut() {
    try {
      this.clearToken();
      return true;
    } catch (error) {
      return error;
    }
  }


  // add comment to task
  async addComment(taskId, userId, content) {
    const query = `
      mutation AddComment($taskId: ID!, $userId: ID!, $content: String!) {
        addComment(taskId: $taskId, userId: $userId, content: $content) {
          id
          commentCount
          comments {
            id
            content
            createdAt
            author {
              id
              name
            }
          }
        }
      }
    `;
    const response = await this.graphqlRequest(query, { taskId, userId, content });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.addComment;
  }

  // delete comment from task
  async deleteComment(taskId, commentId, actorId) {
    const query = `
      mutation DeleteComment($taskId: ID!, $commentId: ID!, $actorId: ID!) {
        deleteComment(taskId: $taskId, commentId: $commentId, actorId: $actorId) {
          id
          commentCount
          comments {
            id
            content
          }
        }
      }
    `;
    const response = await this.graphqlRequest(query, { taskId, commentId, actorId });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.deleteComment;
  }

  // delete task
  async deleteTask(id, actorId) {
    const query = `
      mutation DeleteTask($id: ID!, $actorId: ID!) {
        deleteTask(id: $id, actorId: $actorId) {
          message
          code
        }
      }
    `;
    const response = await this.graphqlRequest(query, { id, actorId });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.deleteTask;
  }

  // update task
  async updateTask(id, updates) {
    const query = `
      mutation UpdateTask(
        $id: ID!
        $actorId: ID!
        $title: String
        $description: String
        $priority: String
        $dueDate: String
        $status: String
        $assignedTo: [ID!]
        $callerPhoneNumber: String
        $patientPhoneNumber: String
        $patientName: String
        $patientDob: String
        $patientAddress: String
        $patientState: String
        $patientZipCode: String
      ) {
        updateTask(
          id: $id
          actorId: $actorId
          title: $title
          description: $description
          priority: $priority
          dueDate: $dueDate
          status: $status
          assignedTo: $assignedTo
          callerPhoneNumber: $callerPhoneNumber
          patientPhoneNumber: $patientPhoneNumber
          patientName: $patientName
          patientDob: $patientDob
          patientAddress: $patientAddress
          patientState: $patientState
          patientZipCode: $patientZipCode
        ) {
          id
          title
          status
          priority
          dueDate
          description
          callerPhoneNumber
          patientPhoneNumber
          patientName
          patientDob
          patientAddress
          patientState
          patientZipCode
          commentCount
          updatedAt
        }
      }
    `;
    const response = await this.graphqlRequest(query, { id, ...updates });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.updateTask;
  }

  // get all tasks
  async getTasks({
    page,
    limit,
    search,
    status,
    priority,
    assignedTo,
    createdBy,
    departmentName,
    createdBySearch,
    callerPhoneNumber,
    patientPhoneNumber,
    patientName,
    patientAddress,
    dueDateFrom,
    dueDateTo,
    createdAtFrom,
    createdAtTo,
    patientDobFrom,
    patientDobTo,
  } = {}) {
    const query = `
      query Tasks($page: Int, $limit: Int, $search: String, $status: String, $priority: String, $assignedTo: ID, $createdBy: ID, $departmentName: String, $createdBySearch: String, $callerPhoneNumber: String, $patientPhoneNumber: String, $patientName: String, $patientAddress: String, $dueDateFrom: String, $dueDateTo: String, $createdAtFrom: String, $createdAtTo: String, $patientDobFrom: String, $patientDobTo: String) {
        tasks(
          page: $page
          limit: $limit
          search: $search
          status: $status
          priority: $priority
          assignedTo: $assignedTo
          createdBy: $createdBy
          departmentName: $departmentName
          createdBySearch: $createdBySearch
          callerPhoneNumber: $callerPhoneNumber
          patientPhoneNumber: $patientPhoneNumber
          patientName: $patientName
          patientAddress: $patientAddress
          dueDateFrom: $dueDateFrom
          dueDateTo: $dueDateTo
          createdAtFrom: $createdAtFrom
          createdAtTo: $createdAtTo
          patientDobFrom: $patientDobFrom
          patientDobTo: $patientDobTo
        ) {
          tasks {
            id
            title
            description
            status
            priority
            dueDate
            callerPhoneNumber
            patientPhoneNumber
            patientName
            patientDob
            patientAddress
            patientState
            patientZipCode
            commentCount
            comments {
              id
              content
              createdAt
              author {
                id
                name
              }
            }
            assignedTo {
              id
              name
            }
            createdBy {
              id
              name
              email
            }
            createdAt
            updatedAt
          }
          total
          page
          limit
          totalPages
          hasNextPage
          hasPrevPage
        }
      }
    `;
    const variables = {};
    const addVariable = (key, value) => {
      if (value === undefined || value === null) return;
      if (typeof value === 'string' && !value.trim()) return;
      variables[key] = typeof value === 'string' ? value.trim() : value;
    };
    addVariable('page', page);
    addVariable('limit', limit);
    addVariable('search', search);
    addVariable('status', status);
    addVariable('priority', priority);
    addVariable('assignedTo', assignedTo);
    addVariable('createdBy', createdBy);
    addVariable('departmentName', departmentName);
    addVariable('createdBySearch', createdBySearch);
    addVariable('callerPhoneNumber', callerPhoneNumber);
    addVariable('patientPhoneNumber', patientPhoneNumber);
    addVariable('patientName', patientName);
    addVariable('patientAddress', patientAddress);
    addVariable('dueDateFrom', dueDateFrom);
    addVariable('dueDateTo', dueDateTo);
    addVariable('createdAtFrom', createdAtFrom);
    addVariable('createdAtTo', createdAtTo);
    addVariable('patientDobFrom', patientDobFrom);
    addVariable('patientDobTo', patientDobTo);
    const response = await this.graphqlRequest(query, variables);
    if (!response.data?.tasks) {
      throw new Error('Failed to fetch tasks');
    }
    return response.data.tasks;
  }

  // get task audit logs
  async getTaskLogs(taskId, { page = 1, limit = 20 } = {}) {
    const query = `
      query TaskLogs($taskId: ID!, $page: Int, $limit: Int) {
        taskLogs(taskId: $taskId, page: $page, limit: $limit) {
          logs {
            id
            actorType
            action
            message
            metadata
            taskSnapshot
            createdAt
            actor {
              id
              name
              email
            }
            task {
              id
              title
              status
            }
          }
          total
          page
          limit
          totalPages
          hasNextPage
          hasPrevPage
        }
      }
    `;
    const response = await this.graphqlRequest(query, { taskId, page, limit });
    if (!response.data?.taskLogs) {
      throw new Error('Failed to fetch task logs');
    }
    return response.data.taskLogs;
  }

  // get a single task by ID
  async getTask(id) {
    const query = `
      query Task($id: ID!) {
        task(id: $id) {
          id
          title
          description
          status
          priority
          dueDate
          callerPhoneNumber
          patientPhoneNumber
          patientName
          patientDob
          patientAddress
          patientState
          patientZipCode
          commentCount
          comments {
            id
            content
            createdAt
            author {
              id
              name
            }
          }
          assignedTo {
            id
            name
          }
          createdBy {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `;
    const response = await this.graphqlRequest(query, { id });
    if (!response.data?.task) {
      throw new Error("This task is no longer available. It may have been deleted.");
    }
    return response.data.task;
  }

  // create task
  async createTask(taskData) {
    const query = `
      mutation CreateTask(
        $title: String!
        $description: String
        $priority: String
        $dueDate: String
        $status: String
        $assignedTo: [ID!]!
        $createdBy: ID!
        $callerPhoneNumber: String
        $patientPhoneNumber: String
        $patientName: String
        $patientDob: String
        $patientAddress: String
        $patientState: String
        $patientZipCode: String
        $comments: [CommentInput]
      ) {
        createTask(
          title: $title
          description: $description
          priority: $priority
          dueDate: $dueDate
          status: $status
          assignedTo: $assignedTo
          createdBy: $createdBy
          callerPhoneNumber: $callerPhoneNumber
          patientPhoneNumber: $patientPhoneNumber
          patientName: $patientName
          patientDob: $patientDob
          patientAddress: $patientAddress
          patientState: $patientState
          patientZipCode: $patientZipCode
          comments: $comments
        ) {
          id
          title
          status
          priority
          dueDate
          description
          callerPhoneNumber
          patientPhoneNumber
          patientName
          patientDob
          patientAddress
          patientState
          patientZipCode
          commentCount
          createdAt
        }
      }
    `;
    const response = await this.graphqlRequest(query, taskData);
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.createTask;
  }

  /**
   * Convenience wrapper to change a task's status using updateTask
   */
  async changeTaskStatus(id, actorId, status) {
    if (!id) throw new Error('Task id is required');
    return this.updateTask(id, { actorId, status });
  }

  /**
   * Convenience wrapper to assign users to a task
   * `assignedTo` should be an array of user IDs
   */
  async assignTask(id, actorId, assignedTo = []) {
    if (!id) throw new Error('Task id is required');
    return this.updateTask(id, { actorId, assignedTo });
  }

  /**
   * Archive a task by setting its status to 'Archived' via updateTask
   */
  async archiveTask(id, actorId) {
    if (!id) throw new Error('Task id is required');
    return this.updateTask(id, { actorId, status: 'archived' });
  }

  /**
   * Restore a previously archived task. `restoreToStatus` defaults to 'open'
   */
  async restoreTask(id, actorId, restoreToStatus = 'open') {
    if (!id) throw new Error('Task id is required');
    return this.updateTask(id, { actorId, status: restoreToStatus });
  }

  /**
   * Fetch tasks with status 'Archived' (convenience wrapper)
   */
  async getArchivedTasks({
    page = 1,
    limit = 20,
    search,
    priority,
    departmentName,
  } = {}) {
    return this.getTasks({
      page,
      limit,
      search,
      status: 'archived',
      priority,
      departmentName,
    });
  }
  async getDepartments() {
    const query = `
      query {
        departments {
          id
          name
          description
        }
      }
    `;
    const response = await this.graphqlRequest(query);
    if (!response.data?.departments) {
      throw new Error("Failed to fetch departments");
    }
    return response.data.departments;
  }
}
const apiService = new ApiService();

export default apiService;