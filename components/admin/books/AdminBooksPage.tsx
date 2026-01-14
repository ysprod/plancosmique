"use client";
import { AdminBooksErrorAlert } from "@/components/admin/books/AdminBooksErrorAlert";
import { AdminBooksHeader } from "@/components/admin/books/AdminBooksHeader";
import { BookAddModal } from "@/components/admin/books/BookAddModal";
import { BookDeleteModal } from "@/components/admin/books/BookDeleteModal";
import { BookFilters } from "@/components/admin/books/BookFilters";
import { BookList } from "@/components/admin/books/BookList";
import { BooksLoading } from "@/components/admin/books/BooksLoading";
import { BookStats } from "@/components/admin/books/BookStats";
import { NoBooksResult } from "@/components/admin/books/NoBooksResult";
import { useAdminBooks } from "@/hooks/books/useAdminBooks";

export default function AdminBooksPage() {
  const {
    books, loading, error, searchQuery, selectedCategory, sortOrder, stats,
    formErrors, statusFilter, sortField, showAddModal, currentStep, submitting,
    showFilters, deleteConfirm, categories, formData, filteredAndSortedBooks,
    setFormData, setDeleteConfirm, setShowFilters, setSortOrder, setSortField,
    setStatusFilter, setSelectedCategory, setError, closeAddModal,
    setSearchQuery, fetchBooks, handleToggleActive, handleDeleteBook,
    handleNextStep, handlePrevStep, handleAddBook, openAddModal,
  } = useAdminBooks();

  if (loading) { return <BooksLoading />; }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <AdminBooksHeader
        booksCount={books.length}
        loading={loading}
        fetchBooks={fetchBooks}
        openAddModal={openAddModal}
      />

      <AdminBooksErrorAlert error={error} onClose={() => setError(null)} />
      <BookStats stats={stats} />

      {books.length > 0 && (
        <BookFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
          filteredCount={filteredAndSortedBooks.length}
        />
      )}
      {filteredAndSortedBooks.length === 0 ? (
        <NoBooksResult />
      ) : (
        <BookList
          books={filteredAndSortedBooks}
          onToggleActive={handleToggleActive}
          onDelete={id => setDeleteConfirm(id)}
          onEdit={() => alert("Fonctionnalité de modification à implémenter")}
        />
      )}
      <BookAddModal
        show={showAddModal}
        onClose={closeAddModal}
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        submitting={submitting}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleAddBook={handleAddBook}
        categories={categories}
      />
      <BookDeleteModal
        show={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm) handleDeleteBook(deleteConfirm);
        }}
      />
    </div>
  );
}
