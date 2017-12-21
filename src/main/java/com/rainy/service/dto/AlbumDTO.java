package com.rainy.service.dto;

import javax.validation.constraints.NotNull;

import com.rainy.domain.Album;

/** 
 * Created by Che on 20/12/2560. 
 */ 

public class AlbumDTO {
	
	private Long id;

    @NotNull
    private String url;

	@NotNull
    private String url_medium;

    @NotNull
    private String url_large;
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl_medium() {
		return url_medium;
	}

	public void setUrl_medium(String url_medium) {
		this.url_medium = url_medium;
	}

	public String getUrl_large() {
		return url_large;
	}

	public void setUrl_large(String url_large) {
		this.url_large = url_large;
	}

	public AlbumDTO() {
		// Empty constructor needed for Jackson
	}
	
	public AlbumDTO(Album album) {
		this(album.getId(), album.getUrl());
	}
	
	public AlbumDTO(Long id, String url) {
		this.id = id;
		this.url = url;
		generateFileName(url);
	}

	@Override
	public String toString() {
		return "AlbumDTO{" +
				"id=" + getId() +  
				", url='" + getUrl() + "'" + 
				", url_medium='" + this.getUrl_medium() + "'" +
				", url_large='" + this.getUrl_large() + "'" +
				"}";
	}
	
	private void generateFileName(String url) {
		String splittedUrl[] = url.split("/");		
		String fileAndExtension = "";
		String fileName = "";
		String extension = "";
		String newFileName = "";
		
		if (splittedUrl.length > 0) {
			fileAndExtension = splittedUrl[8];			
		}
		
		String splittedSlash[] = fileAndExtension.split("\\.");
		if (splittedSlash.length > 0) {
			fileName = splittedSlash[0];
			extension = splittedSlash[1];			
		}
		
		for (int i = 0; i < splittedUrl.length - 1; i++) {
			newFileName = newFileName.concat(splittedUrl[i] + "/");
		}
		
		this.url_medium = newFileName.concat(fileName + "_320." + extension);
		this.url_large = newFileName.concat(fileName + "_640." + extension);
	}
	
}
