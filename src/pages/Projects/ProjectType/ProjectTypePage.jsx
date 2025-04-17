import { useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getAllProjects, getProjecByType } from "../../../data/projects"
import ProyectoItem from './../../../components/ProjectItem'
import './project_type.css'
import { useTranslation } from "react-i18next"

export function ProjectTypePage() {
    const [t, i18n] = useTranslation("global");
    const [searchParams, setSearchParams] = useSearchParams();
    const projects = getAllProjects();
    const { projectType } = useParams();
    const projectId = useMemo(() => getProjecByType(projectType), [projectType]);

    const handleChange = (e) => {
        setSearchParams({ filter: e.target.value });
    };

    const filter = searchParams.get("filter") ?? "";

    const {
        type
    } = projectId;
    const currentType = searchParams.get("type") ?? projectType;

    const filteredProjects = projects.filter((project) => {
        if (!filter) {
            return project.type === currentType;
        }
        return (
            project.type === currentType &&
            project.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    // Change to Web projects
    const changeWebProjects = () => {
        setSearchParams({ filter: "", type: "web" });
    };

    const changeMovilProjects = () => {
        setSearchParams({ filter: "", type: "movil" });
    };
    return (
        <div>
            <div className="project-type">
                <form className="search">
                    <input
                        placeholder={t('project-type-page.search')}
                        type="text"
                        className="input-textarea"
                        maxLength="50"
                        value={filter}
                        onChange={handleChange}
                    />
                    <button
                        className="btn-search noSelect cursor-pointer"
                        type="reset"
                        onChange={handleChange}
                        onClick={() => setSearchParams({ filter: "" })}
                    ></button>
                </form>
                <div className="projects-filter">
                    <button
                        className="filter-btn btn-web"
                        onClick={changeWebProjects}>
                        {t('projects-page.title')} WEB
                    </button>
                    <button
                        className="filter-btn btn-movil"
                        onClick={changeMovilProjects}>
                        {t('projects-page.title')} MOBILE
                    </button>
                </div>
                <br />
                <div className="projects-list noScrollBar">
                    {filteredProjects.map((project) => (
                        <div key={project.id}>
                            <Link
                                className="noSelect"
                                to={`/projects/${project.type}/${project.id}`}
                            >
                                <ProyectoItem
                                    imgClase={project.type}
                                    projects={project}
                                    type={project.type}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
