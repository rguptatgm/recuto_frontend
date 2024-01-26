import { toast } from "react-toastify";

export class Logging {
  static info = async (args: {
    className: string;
    methodName: string;
    message: string;
    exception?: any;
    showAlert?: boolean;
  }): Promise<void> => {
    if (args.showAlert) {
      toast.error(args.message);
    }
  };

  static warning = async (args: {
    className: string;
    methodName: string;
    message: string;
    exception?: any;
    stacktrace?: any;
    showAlert?: boolean;
  }): Promise<void> => {
    if (args.showAlert) {
      toast.error(args.message);
    }
  };

  static error = async (args: {
    className: string;
    methodName: string;
    message?: string;
    exception?: any;
    showAlert?: boolean;
  }): Promise<void> => {
    if (args.showAlert) {
      toast.error(args.message);
    }
  };
}
