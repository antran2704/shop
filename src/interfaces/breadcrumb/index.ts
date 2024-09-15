interface IBreadcrumbItem {
   title: string;
   path?: string | null;
   className?: string;
}

interface IBreadcrumb {
   items: IBreadcrumbItem[];
   separator?: string;
   className?: string;
}

export type { IBreadcrumb, IBreadcrumbItem };
