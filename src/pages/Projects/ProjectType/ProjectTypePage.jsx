import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getAllProjects } from "../../../data/projects";
import ProyectoItem from './../../../components/ProjectItem';
import './project_type.css';
import { useTranslation } from "react-i18next";

export function ProjectTypePage() {
    const [t] = useTranslation("global");
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedType, setSelectedType] = useState(""); // Estado para el tipo seleccionado
    const [filter, setFilter] = useState(""); // Estado para el filtro de búsqueda
    const projects = getAllProjects();
    const { projectType } = useParams();

    // Establecer el tipo de proyecto desde la URL
    useEffect(() => {
        setSelectedType(projectType); // Actualiza el tipo de proyecto con el valor de la URL
        setFilter(""); // Resetea el filtro cada vez que cambie el tipo de proyecto
        setSearchParams({ filter: "", type: projectType }); // Actualiza los parámetros de búsqueda con el filtro vacío y el tipo de proyecto
    }, [projectType]);

    // Filtrar los proyectos basados en el tipo y filtro
    const filteredProjects = projects.filter((project) => {
        if (!filter) {
            return project.type === selectedType; // Si no hay filtro, solo filtra por tipo
        }
        return (
            project.type === selectedType &&
            project.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    // Manejar el cambio del campo de búsqueda
    const handleChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter); // Actualiza el estado del filtro
        setSearchParams({ filter: newFilter, type: selectedType }); // Actualiza los parámetros de búsqueda en la URL
    };

    // Cambiar al filtro de proyectos Web
    const changeWebProjects = () => {
        setSelectedType("web");
        setFilter(""); // Limpiar el filtro cuando se selecciona Web
        setSearchParams({ filter: "", type: "web" }); // Cambiar el tipo a "web" y limpiar el filtro en la URL
    };

    // Cambiar al filtro de proyectos Mobile
    const changeMovilProjects = () => {
        setSelectedType("movil");
        setFilter(""); // Limpiar el filtro cuando se selecciona Mobile
        setSearchParams({ filter: "", type: "movil" }); // Cambiar el tipo a "movil" y limpiar el filtro en la URL
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
                        onChange={handleChange} // Mantener el valor del filtro
                    />
                    <button
                        className="btn-search noSelect cursor-pointer"
                        type="reset"
                        onClick={() => setSearchParams({ filter: "", type: selectedType })}
                    ></button>
                </form>

                <div className="projects-filter">
                    <button
                        className={`filter-btn btn-web ${selectedType === "web" ? "active" : ""}`}
                        onClick={changeWebProjects}
                    >
                        {t('projects-page.title')} WEB
                    </button>

                    <button
                        className={`filter-btn btn-movil ${selectedType === "movil" ? "active" : ""}`}
                        onClick={changeMovilProjects}
                    >
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
