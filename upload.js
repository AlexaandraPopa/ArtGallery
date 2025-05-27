document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const status = document.getElementById('status');
  status.textContent = "Se încarcă...";

  const form = e.target;
  const file = form.poza.files[0];
  if (!file) {
    status.textContent = "Te rog să selectezi o imagine.";
    return;
  }

  const safeFileName = file.name.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase();
  const fileName = `${Date.now()}_${safeFileName}`;

  const { data, error } = await supabase.storage
    .from('tablouri')
    .upload(fileName, file, {
    });

  if (error) {
    console.error("Upload error:", error);
    status.textContent = "Eroare la încărcarea imaginii.";
    return;
  }


  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from('tablouri')
    .getPublicUrl(fileName);

  if (publicUrlError) {
    console.error('Public URL error:', publicUrlError);
    status.textContent = "Eroare la obținerea URL-ului imaginii.";
    return;
  }

  const imageUrl = publicUrlData.publicUrl;

  const { error: insertError } = await supabase
    .from('tablouri')
    .insert([{
      nume_proprietar: form.nume_proprietar.value,
      nume_tablou: form.nume_tablou.value,
      descriere: form.descriere.value,
      nr_telefon: form.nr_telefon.value,
      poza_url: imageUrl,
    }]);

  if (insertError) {
    console.error('Insert error:', insertError);
    status.textContent = "Eroare la salvarea în baza de date.";
    return;
  }

  status.textContent = "Tabloul a fost încărcat cu succes!";
  form.reset();
});
