import { Vec2 } from "@/utils";

export interface PartialOsWindow {
    id: string;
    title: string;
    icon: string;
    type: OsWindowType;
}

export interface OsWindow extends PartialOsWindow {
    position: Vec2;
}

export type OsWindowType =
    'recycle_bin'
    | 'about_me'
    | 'qualifications'
    | 'blog'
    | 'game';